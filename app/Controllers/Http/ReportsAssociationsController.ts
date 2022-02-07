import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReasonType } from 'App/Enums/ReasonType'
import { ReportEntity } from 'App/Enums/ReportEntity'
import Reason from 'App/Models/Reason'
import Report from 'App/Models/Report'
import ReportAssociationValidator from 'App/Validators/ReportAssociationValidator'

export default class ReportsAssociationsController {
  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ReportAssociationPolicy').authorize('create')

    const reasons = await Reason.query().where('type', ReasonType.Association)

    return view.render('pages/associations/reports/create', { reasons })
  }

  public async store({ response, params, request, auth, bouncer }: HttpContextContract) {
    await bouncer.with('ReportAssociationPolicy').authorize('create')

    const { reasonId, description } = await request.validate(ReportAssociationValidator)

    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    if (report) {
      // TODO: Afficher un message d'erreur
      return response.redirect().toRoute('AssociationsController.show', { id: params.id })
    }

    await Report.create({
      reporterId: auth.user!.id,
      reasonId,
      description,
      entityId: params.id,
      entityType: ReportEntity.Association,
    })

    return response.redirect().toRoute('AssociationsController.show', { id: params.id })
  }
}
