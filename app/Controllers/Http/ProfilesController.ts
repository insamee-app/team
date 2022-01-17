import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import ProfileEditValidator from 'App/Validators/ProfileEditValidator'

export default class ProfilesController {
  public async me({ auth, view }: HttpContextContract) {
    const user = auth.user!
    await user.load('profile', (profile) => profile.preload('school'))

    return view.render('pages/me/show', { user })
  }

  public async edit({ auth, view }: HttpContextContract) {
    const user = auth.user!
    await user.load('profile', (profile) => profile.preload('school'))

    return view.render('pages/me/edit', { user })
  }

  public async update({ request, auth, response }: HttpContextContract) {
    const user = auth.user!
    const payload = await request.validate(ProfileEditValidator)

    const profile = await Profile.findBy('userId', user.id)
    profile!.merge(payload)

    await profile!.save()

    return response.redirect().toRoute('ProfilesController.me')
  }
}
