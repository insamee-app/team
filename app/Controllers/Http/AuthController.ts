import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

  public async register({ request, response, view }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.create(payload)

    return view.render('auth/confirm')
  }
}
