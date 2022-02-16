import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import ProfileAvatarValidator from 'App/Validators/ProfileAvatarValidator'

export default class ProfilesAvatarsController {
  public async edit({ view, params, bouncer }: HttpContextContract) {
    const profile = await Profile.query().where('id', params.id).firstOrFail()
    await bouncer.with('ProfileAvatarPolicy').authorize('update', profile)

    return view.render('pages/mee/avatars/edit', {
      profile,
    })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    const profile = await Profile.query().where('id', params.id).firstOrFail()
    await bouncer.with('ProfileAvatarPolicy').authorize('update', profile)

    const { avatar } = await request.validate(ProfileAvatarValidator)

    profile.avatar = Attachment.fromFile(avatar)

    await profile.save()

    session.flash('success', 'Avatar mis à jour avec succès')
    return response.redirect().toRoute('ProfilesController.show', { id: params.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    const profile = await Profile.query().where('id', params.id).firstOrFail()
    await bouncer.with('ProfileAvatarPolicy').authorize('delete', profile)

    profile.avatar = null

    await profile.save()

    session.flash('success', 'Avatar supprimé avec succès')
    return response.redirect().toRoute('ProfilesController.show', { id: params.id })
  }
}
