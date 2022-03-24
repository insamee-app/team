import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EventProfileState } from 'App/Enums/EventProfileState'
import { EventStatus } from 'App/Enums/EventStatus'
import Event from 'App/Models/Event'

export default class EventsInterestedController {
  public async store({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    const event = await Event.query().where('id', params.id).firstOrFail()

    if (!event.isPassed() && event.status === EventStatus.Published) {
      await auth.user?.profile.related('events').sync({
        [params.id]: {
          state: EventProfileState.Interested,
        },
      })
    }

    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    const event = await Event.query().where('id', params.id).firstOrFail()

    if (!event.isPassed() && event.status === EventStatus.Published) {
      await auth.user?.profile.related('events').detach([params.id])
    }

    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }
}
