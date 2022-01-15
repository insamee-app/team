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

export default class AuthController {
  public async showLoginForm({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    await auth.attempt(email, password)

    return response.redirect('/')
  }

  public async showRegisterForm({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ request, session, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const host = payload.email.split('@')[1]
    const school = await getSchoolByHost(host)

    const user = await User.create(payload)
    await user.related('profile').create({ schoolId: school!.id, userId: user.id })

    const url = Route.makeSignedUrl(
      'AuthController.validateUser',
      {
        id: user.id,
      },
      { expiresIn: '1h' }
    )

    new EmailValidation(user, `${Env.get('APP_URL')}${url}`).sendLater()

    session.flash('success', `Un email de confirmation vous a été envoyé`)
    return response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async validateUser({ auth, request, response, session, params }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash('error', `Ce lien n'est pas valide`)
      return response.redirect().toPath('/')
    }

    const id = params.id
    const user = await User.findOrFail(id)

    if (user.status === UserStatus.Pending) {
      user.status = UserStatus.Active
      await user.save()

      // Important to prevent blocked users from logging in
      await auth.login(user)
    }

    session.flash('success', `Votre compte a été validé avec succès`)
    return response.redirect('/')
  }

  public async showSendVerifyEmailForm({ view }: HttpContextContract) {
    return view.render('auth/verify_email')
  }

  public async sendVerifyEmail({ request, response, session }: HttpContextContract) {
    const { email } = await request.validate(SendVerifyEmailValidator)

    const user = await User.findBy('email', email)

    const url = Route.makeSignedUrl(
      'AuthController.validateUser',
      {
        id: user!.id,
      },
      { expiresIn: '1h' }
    )

    new EmailValidation(user!, `${Env.get('APP_URL')}${url}`).sendLater()

    session.flash('success', `Un email de confirmation vous a été envoyé`)
    return response.redirect('/')
  }

  public async showSendResetPasswordForm({ view }: HttpContextContract) {
    return view.render('auth/reset_password')
  }

  public async sendResetPassword({ request, response, session }: HttpContextContract) {
    const { email } = await request.validate(SendResetPasswordValidator)

    const user = await User.findBy('email', email)

    const url = Route.makeSignedUrl(
      'AuthController.changePassword',
      {
        user_id: user!.id,
      },
      { expiresIn: '1h' }
    )

    new ResetPassword(user!, `${Env.get('APP_URL')}${url}`).sendLater()

    session.flash('success', `Un email de réinitialisation de mot de passe vous a été envoyé`)
    return response.redirect('/')
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
    response.redirect('/')
  }
}