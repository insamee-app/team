import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Association from 'App/Models/Association'
import AssociationPictureValidator from 'App/Validators/AssociationPictureValidator'

export default class AssociationsPicturesController {
  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('update')

    const association = await Association.findOrFail(params.id)

    return view.render('pages/associations/pictures/edit', {
      association,
    })
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('update')

    const association = await Association.findOrFail(params.id)

    const { picture } = await request.validate(AssociationPictureValidator)

    association.picture = Attachment.fromFile(picture)

    await association.save()

    return response.redirect().toRoute('AssociationsController.show', { id: params.id })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('delete')

    const association = await Association.findOrFail(params.id)

    association.picture = null

    await association.save()

    return response.redirect().toRoute('AssociationsController.show', { id: params.id })
  }
}
