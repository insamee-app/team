import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import EmailValidation from 'App/Mailers/EmailValidation'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import { UserStatus } from 'App/Enums/UserStatus'
import SendVerifyEmailValidator from 'App/Validators/SendVerifyEmailValidator'
import ResetPassword from 'App/Mailers/ResetPassword'
import SendResetPasswordValidator from 'App/Validators/SendResetPasswordValidator'
import ChangePasswordValidator from 'App/Validators/ChangePasswordValidator'
import { getSchoolByHost } from 'App/Services/school'
import Welcome from 'App/Mailers/Welcome'

export default class AuthController {
  public async showLoginForm({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ auth, request, response, session }: HttpContextContract) {
    const { email, password, rememberMe } = await request.validate(LoginValidator)

    await auth.attempt(email.toLowerCase(), password, rememberMe || false)

    const profile = await auth.user?.related('profile').query().select('first_name').firstOrFail()

    session.flash(
      'info',
      `Vous êtes maintenant connecté ${profile!.firstName ? profile!.firstName : ''}`
    )
    return response.redirect().toRoute('ProfilesController.index')
  }

  public async showRegisterForm({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ request, session, response }: HttpContextContract) {
    const { firstName, lastName, email, password } = await request.validate(RegisterValidator)

    const host = email.split('@')[1]
    const school = await getSchoolByHost(host)

    const user = await User.create({ email: email.toLowerCase(), password })
    const profile = await user
      .related('profile')
      .create({ firstName, lastName, schoolId: school!.id, userId: user.id })

    const url = Route.makeSignedUrl(
      'AuthController.validateUser',
      {
        id: user.id,
      },
      { expiresIn: '10m' }
    )

    new EmailValidation(user, profile, `${Env.get('APP_URL')}${url}`).sendLater()

    session.flash('success', `Un email de confirmation vous a été envoyé`)
    return response.redirect().toRoute('home')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async validateUser({ auth, request, response, session, params }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash('error', `Ce lien n'est pas valide`)
      return response.redirect().toRoute('home')
    }

    const id = params.id
    const user = await User.findOrFail(id)
    const profile = await user.related('profile').query().select('first_name').firstOrFail()

    if (user.status === UserStatus.Pending) {
      user.status = UserStatus.Active
      await user.save()

      await auth.login(user)

      new Welcome(user, profile, `${Env.get('APP_URL')}`).sendLater()

      session.flash('success', `Votre compte a été validé avec succès`)
      return response.redirect().toRoute('ProfilesController.index')
    }

    session.flash('info', `Votre compte a déjà été validé`)
    if (auth.isLoggedIn) return response.redirect().toRoute('ProfilesController.index')
    else return response.redirect().toRoute('home')
  }

  public async showSendVerifyEmailForm({ view }: HttpContextContract) {
    return view.render('auth/verify_email')
  }

  public async sendVerifyEmail({ request, response, session }: HttpContextContract) {
    const { email } = await request.validate(SendVerifyEmailValidator)

    const user = await User.query().where('email', email.toLowerCase()).firstOrFail()
    const profile = await user!.related('profile').query().select('first_name').firstOrFail()

    const url = Route.makeSignedUrl(
      'AuthController.validateUser',
      {
        id: user!.id,
      },
      { expiresIn: '10m' }
    )

    new EmailValidation(user!, profile, `${Env.get('APP_URL')}${url}`).sendLater()

    session.flash('success', `Un email de confirmation vous a été envoyé`)
    return response.redirect().toRoute('home')
  }

  public async showSendResetPasswordForm({ view }: HttpContextContract) {
    return view.render('auth/reset_password')
  }

  public async sendResetPassword({ request, response, session }: HttpContextContract) {
    const { email } = await request.validate(SendResetPasswordValidator)

    const user = await User.query().where('email', email.toLowerCase()).firstOrFail()
    const profile = await user!.related('profile').query().select('first_name').firstOrFail()

    const url = Route.makeSignedUrl(
      'AuthController.changePassword',
      {
        user_id: user!.id,
      },
      { expiresIn: '10m' }
    )

    new ResetPassword(user!, profile, `${Env.get('APP_URL')}${url}`).sendLater()

    session.flash('success', `Un email de réinitialisation de mot de passe vous a été envoyé`)
    return response.redirect().toRoute('home')
  }

  public async showChangePasswordForm({ view, params }: HttpContextContract) {
    return view.render('auth/change_password', { user_id: params.user_id })
  }

  public async changePassword({ request, response, session, params }: HttpContextContract) {
    const { password } = await request.validate(ChangePasswordValidator)

    const user = await User.findOrFail(params.user_id)

    user!.merge({ password })
    await user!.save()

    session.flash('success', `Votre mot de passe a été modifié avec succès`)
    response.redirect().toRoute('home')
  }
}
