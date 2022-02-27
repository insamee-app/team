import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Association from 'App/Models/Association'
import AssociationPictureValidator from 'App/Validators/AssociationPictureValidator'

export default class AssociationsPicturesController {
  public async edit({ view, params, bouncer }: HttpContextContract) {
    const association = await Association.query().where('id', params.id).firstOrFail()

    await bouncer.with('AssociationPicturePolicy').authorize('update', association)

    return view.render('pages/associations/pictures/edit', {
      association,
    })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    const association = await Association.query().where('id', params.id).firstOrFail()

    await bouncer.with('AssociationPicturePolicy').authorize('update', association)

    const { picture } = await request.validate(AssociationPictureValidator)

    association.picture = Attachment.fromFile(picture)

    await association.save()

    session.flash('success', "Image de l'association mise à jour avec succès")
    return response.redirect().toRoute('AssociationsController.show', { id: params.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    const association = await Association.query().where('id', params.id).firstOrFail()

    await bouncer.with('AssociationPicturePolicy').authorize('delete', association)

    association.picture = null

    await association.save()

    session.flash('success', "Image de l'association supprimée avec succès")
    return response.redirect().toRoute('AssociationsController.show', { id: params.id })
  }
}
