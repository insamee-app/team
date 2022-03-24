import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReasonType } from 'App/Enums/ReasonType'
import { ReportEntity } from 'App/Enums/ReportEntity'
import Reason from 'App/Models/Reason'
import Report from 'App/Models/Report'
import ReportEventValidator from 'App/Validators/ReportEventValidator'

export default class ReportsEventsController {
  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ReportEventPolicy').authorize('create')

    const reasons = await Reason.query().where('type', ReasonType.Event)

    return view.render('pages/events/reports/create', { reasons })
  }

  public async store({ response, params, request, auth, bouncer, session }: HttpContextContract) {
    await bouncer.with('ReportEventPolicy').authorize('create')

    const { reasonId, description } = await request.validate(ReportEventValidator)

    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    if (report) {
      session.flash('error', 'Vous avez déjà signalé cet événement')
      return response.redirect().toRoute('EventsController.show', { id: params.id })
    }

    await Report.create({
      reporterId: auth.user!.id,
      reasonId,
      description,
      entityId: params.id,
      entityType: ReportEntity.Event,
    })

    session.flash('success', 'Votre signalement a bien été pris en compte')
    return response.redirect().toRoute('EventsController.show', { id: params.id })
  }
}
