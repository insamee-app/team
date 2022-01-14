import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {
  public async showRegisterForm({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)
    // console.log(payload.email)
    return response.redirect('/')
  }
}
