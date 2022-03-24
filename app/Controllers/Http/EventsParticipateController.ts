import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EventProfileState } from 'App/Enums/EventProfileState'
import Event from 'App/Models/Event'

export default class EventsParticipateController {
  public async store({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    const event = await Event.query().where('id', params.id).firstOrFail()

    if (!event.isPassed()) {
      await auth.user?.profile.related('events').sync({
        [params.id]: {
          state: EventProfileState.Participate,
        },
      })
    }

    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    await auth.user?.profile.related('events').detach([params.id])

    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }
}
