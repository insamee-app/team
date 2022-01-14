import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import EmailValidation from 'App/Mailers/EmailValidation'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async showLoginForm({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.only(['email', 'password'])

    await auth.attempt(email, password)

    return response.redirect('/')
  }

  public async showRegisterForm({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ request, view }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload)

    const url = Route.makeSignedUrl(
      'AuthController.validateUser',
      {
        id: user.id,
      },
      { expiresIn: '1h' }
    )

    new EmailValidation(user, `${Env.get('APP_URL')}${url}`).sendLater()

    return view.render('auth/confirm')
  }

  public async validateUser({ auth, request, response, session, params }: HttpContextContract) {
    if (!request.hasValidSignature()) {
      session.flash('error', `Ce lien n'est pas valide`)
      return response.redirect().toPath('/')
    }

    const id = params.id
    const user = await User.findOrFail(id)
    // user.status = UserStatus.Active
    // await user.save()
    await auth.login(user)

    session.flash('success', `Votre compte a été validé avec succès`)
    return response.redirect('/')
  }
}
