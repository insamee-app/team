import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesAvatarsController {
  public async edit({ auth, view }: HttpContextContract) {
    const user = auth.user!

    const data = await Profile.query()
      .select('avatar', 'firstName')
      .where('user_id', user.id)
      .first()

    return view.render('pages/me/avatar/edit', { firstName: data!.firstName, avatar: data!.avatar })
  }

  public async update({ request, auth, response }: HttpContextContract) {
    return 'update'
  }

  public async destroy({ auth, response }: HttpContextContract) {
    return 'destroy'
  }
}
