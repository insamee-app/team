import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from 'App/Models/Event'
import EventImageValidator from 'App/Validators/EventImageValidator'

export default class EventsImagesController {
  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('EventImagePolicy').authorize('update')

    const event = await Event.query().where('id', params.id).first()

    return view.render('pages/events/images/edit', {
      event,
    })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('EventImagePolicy').authorize('update')

    const event = await Event.query().where('id', params.id).firstOrFail()

    const { image } = await request.validate(EventImageValidator)

    event.image = Attachment.fromFile(image)

    await event.save()

    session.flash('success', "Image de l'événement mise à jour avec succès")
    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('EventImagePolicy').authorize('delete')

    const event = await Event.query().where('id', params.id).firstOrFail()

    event.image = null

    await event.save()

    session.flash('success', "Image de l'événement supprimée avec succès")
    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }
}
