import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReasonType } from 'App/Enums/ReasonType'
import { ReportEntity } from 'App/Enums/ReportEntity'
import Reason from 'App/Models/Reason'
import Report from 'App/Models/Report'
import ReportProfileValidator from 'App/Validators/ReportProfileValidator'

export default class ReportsProfilesController {
  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ReportProfilePolicy').authorize('create')

    const reasons = await Reason.query().where('type', ReasonType.Profile)

    return view.render('pages/mee/reports/create', { reasons })
  }

  public async store({ response, params, request, auth, bouncer }: HttpContextContract) {
    await bouncer.with('ReportProfilePolicy').authorize('create')

    const { reasonId, description } = await request.validate(ReportProfileValidator)

    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    if (report) {
      // TODO: Afficher un message d'erreur
      return response.redirect().toRoute('ProfilesController.show', { id: params.id })
    }

    await Report.create({
      reporterId: auth.user!.id,
      reasonId,
      description,
      entityId: params.id,
      entityType: ReportEntity.Profile,
    })

    return response.redirect().toRoute('ProfilesController.show', { id: params.id })
  }
}
