import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import ProfileAvatarValidator from 'App/Validators/ProfileAvatarValidator'

export default class ProfilesAvatarsController {
  public async edit({ view, params, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', user)

    await user.load('profile')

    return view.render('pages/mee/avatar/edit', {
      user,
    })
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    console.log('update')
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', user)

    const { avatar } = await request.validate(ProfileAvatarValidator)

    const profile = await user.related('profile').query().firstOrFail()
    profile.avatar = Attachment.fromFile(avatar)

    await profile.save()

    return response.redirect().toRoute('ProfilesController.show', { id: params.id })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('delete', user)

    const profile = await user.related('profile').query().firstOrFail()
    profile.avatar = null

    await profile.save()

    return response.redirect().toRoute('ProfilesController.show', { id: params.id })
  }
}
