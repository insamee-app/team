import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReasonType } from 'App/Enums/ReasonType'
import { ReportEntity } from 'App/Enums/ReportEntity'
import Reason from 'App/Models/Reason'
import Report from 'App/Models/Report'

export default class ReportsSchoolsController {
  // Ajouter le bouncer

  public async create({ view }: HttpContextContract) {
    const reasons = await Reason.query().where('type', ReasonType.School)

    return view.render('pages/schools/reports/create', { reasons })
  }

  public async store({ response, params, request, auth }: HttpContextContract) {
    // Mettre en place le validator
    const { reasonId, description } = request.all()

    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first() // A utiliser pour le "vous avez déjà signalé"

    // Si on a un report alors on met un message et on redirige vers la page de l'association

    await Report.create({
      reporterId: auth.user!.id,
      reasonId,
      description,
      entityId: params.id,
      entityType: ReportEntity.School,
    })

    return response.redirect().toRoute('SchoolsController.show', { id: params.id })
  }
}
