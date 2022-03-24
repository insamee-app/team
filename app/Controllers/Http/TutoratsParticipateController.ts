import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TutoratProfileState } from 'App/Enums/TutoratProfileState'
import { TutoratStatus } from 'App/Enums/TutoratStatus'
import Tutorat from 'App/Models/Tutorat'

export default class TutoratsParticipateController {
  public async store({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    const tutorat = await Tutorat.query()
      .where('id', params.id)
      .withCount('participatingProfiles', (query) => query.as('participatingCount'))
      .firstOrFail()

    if (
      !tutorat.isPassed() &&
      tutorat.isPublished() &&
      tutorat.isAnOffer() &&
      tutorat.attendeeCapacity &&
      (tutorat.$extras.participatingCount as unknown as number) < tutorat.attendeeCapacity
    ) {
      await auth.user?.profile.related('tutorats').sync({
        [params.id]: {
          state: TutoratProfileState.Participate,
        },
      })
    }

    return response.redirect().toRoute('TutoratsController.show', { id: params.id })
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    await auth.user?.load('profile')

    const tutorat = await Tutorat.query().where('id', params.id).firstOrFail()

    if (!tutorat.isPassed() && tutorat.isPublished() && tutorat.isAnOffer()) {
      await auth.user?.profile.related('tutorats').detach([params.id])
    }

    return response.redirect().toRoute('TutoratsController.show', { id: params.id })
  }
}
