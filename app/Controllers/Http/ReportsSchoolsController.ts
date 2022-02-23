import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReasonType } from 'App/Enums/ReasonType'
import { ReportEntity } from 'App/Enums/ReportEntity'
import Reason from 'App/Models/Reason'
import Report from 'App/Models/Report'
import ReportSchoolValidator from 'App/Validators/ReportSchoolValidator'

export default class ReportsSchoolsController {
  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ReportSchoolPolicy').authorize('create')

    const reasons = await Reason.query().where('type', ReasonType.School)

    return view.render('pages/schools/reports/create', { reasons })
  }

  public async store({ response, params, request, auth, bouncer, session }: HttpContextContract) {
    await bouncer.with('ReportSchoolPolicy').authorize('create')

    const { reasonId, description } = await request.validate(ReportSchoolValidator)

    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    if (report) {
      session.flash('error', 'Vous avez déjà signalé cette école')
      return response.redirect().toRoute('SchoolsController.show', { id: params.id })
    }

    await Report.create({
      reporterId: auth.user!.id,
      reasonId,
      description,
      entityId: params.id,
      entityType: ReportEntity.School,
    })

    session.flash('success', 'Votre signalement a bien été pris en compte')
    return response.redirect().toRoute('SchoolsController.show', { id: params.id })
  }
}
