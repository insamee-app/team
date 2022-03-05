import Env from '@ioc:Adonis/Core/Env'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserStatus } from 'App/Enums/UserStatus'
import Welcome from 'App/Mailers/Welcome'
import User from 'App/Models/User'
import { getSchoolByHost } from 'App/Services/school'
import SendResetPasswordService from 'App/Services/SendResetPasswordService'
import SendVerifyEmailService from 'App/Services/SendVerifyEmailService'
import ChangePasswordValidator from 'App/Validators/ChangePasswordValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import RegisterValidator from 'App/Validators/RegisterValidator'
import SendResetPasswordValidator from 'App/Validators/SendResetPasswordValidator'
import SendVerifyEmailValidator from 'App/Validators/SendVerifyEmailValidator'

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

    await new SendVerifyEmailService(user!, profile)
      .afterSend(() => {
        session.flash('success', 'Un email de confirmation vous a été envoyé')
        response.redirect().toRoute('home')
      })
      .exec()
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect('/')
  }

  public async validateUser({ auth, request, response, session, params }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      if (auth.isGuest) {
        session.flash('error', `Ce lien n'est pas valide`)
        return response.redirect().toRoute('home')
      } else {
        session.flash('info', `Votre compte est déjà validé`)
        return response.redirect().toRoute('ProfilesController.show', { id: auth.user!.id })
      }
    }

    const id = params.id
    const user = await User.findOrFail(id)
    const profile = await user.related('profile').query().select('first_name').firstOrFail()

    if (user.status === UserStatus.Pending) {
      user.status = UserStatus.Active
      user.sendValidationAt = null
      await user.save()

      // Only login when user was pending
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

    await new SendVerifyEmailService(user!, profile)
      .alreadyVerified(() => {
        session.flash('info', `Votre email est déjà validé. Vous pouvez vous connecter !`)
        response.redirect().toRoute('AuthController.login')
      })
      .alreadySend(() => {
        session.flash(
          'info',
          'Un email de confirmation vous a déjà été envoyé. Veuillez vérifier votre boite mail et patienter quelques minutes avant de réessayer !'
        )
        response.redirect().toRoute('home')
      })
      .afterSend(() => {
        session.flash('success', 'Un email de confirmation vous a été envoyé')
        response.redirect().toRoute('home')
      })
      .exec()
  }

  public async showSendResetPasswordForm({ view }: HttpContextContract) {
    return view.render('auth/reset_password')
  }

  public async sendResetPassword({ request, response, session, auth }: HttpContextContract) {
    const { email } = await request.validate(SendResetPasswordValidator)

    const user = await User.query().where('email', email.toLowerCase()).firstOrFail()
    const profile = await user!.related('profile').query().select('id', 'first_name').firstOrFail()

    await new SendResetPasswordService(user!, profile)
      .alreadySend(() => {
        session.flash(
          'info',
          'Un email de réinitialisation de mot de passe vous a déjà été envoyé. Veuillez vérifier votre boite mail et patienter quelques minutes avant de réessayer !'
        )
      })
      .afterSend(() => {
        session.flash('success', 'Un email de réinitialisation de mot de passe vous a été envoyé')
      })
      .exec()

    if (auth.isLoggedIn)
      return response.redirect().toRoute('ProfilesController.show', { id: profile.id })
    else return response.redirect().toRoute('home')
  }

  public async showChangePasswordForm({ view, params }: HttpContextContract) {
    return view.render('auth/change_password', { user_id: params.user_id })
  }

  public async changePassword({ request, response, session, params, auth }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash('error', `Ce lien n'est pas valide`)
      if (auth.isGuest) {
        return response.redirect().toRoute('home')
      } else {
        await auth.user!.load('profile', (query) => query.select('id'))
        return response.redirect().toRoute('ProfilesController.show', { id: auth.user!.profile.id })
      }
    }

    const { password } = await request.validate(ChangePasswordValidator)

    const user = await User.query().where('id', params.user_id).firstOrFail()

    user!.merge({ password, sendResetPasswordAt: null })
    await user!.save()

    session.flash('success', `Votre mot de passe a été modifié avec succès`)
    if (auth.isLoggedIn) {
      await auth.user!.load('profile', (query) => query.select('id'))
      return response.redirect().toRoute('ProfilesController.show', { id: auth.user!.profile.id })
    } else {
      return response.redirect().toRoute('home')
    }
  }
}
