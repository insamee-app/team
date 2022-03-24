import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EventProfileState } from 'App/Enums/EventProfileState'

export default class EventsInterestedController {
  public async store({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    await auth.user?.profile.related('events').sync({
      [params.id]: {
        state: EventProfileState.Interested,
      },
    })

    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    await auth.user?.profile.related('events').detach([params.id])

    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }
}
