import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TutoratProfileState } from 'App/Enums/TutoratProfileState'

export default class TutoratsInterestedController {
  public async store({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    await auth.user?.profile.related('tutorats').sync({
      [params.id]: {
        state: TutoratProfileState.Interested,
      },
    })

    return response.redirect().toRoute('TutoratsController.show', { id: params.id })
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    await auth.user?.profile.related('tutorats').detach([params.id])

    return response.redirect().toRoute('TutoratsController.show', { id: params.id })
  }
}
