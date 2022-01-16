import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {
  public async me({ auth, view }: HttpContextContract) {
    const user = auth.user!
    await user.load('profile', (profile) => profile.preload('school'))

    return view.render('pages/me', { user })
  }
}
