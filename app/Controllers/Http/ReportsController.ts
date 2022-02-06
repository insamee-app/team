import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReportEntity } from 'App/Enums/ReportEntity'
import Report from 'App/Models/Report'

export default class ReportsController {
  private PER_PAGE = 10

  public async index({ view, request, bouncer }: HttpContextContract) {
    await bouncer.with('ReportPolicy').authorize('viewList')

    const page = request.input('page', 1)

    const reports = await Report.query()
      .select('number', 'id', 'isResolved')
      .orderBy('number', 'desc')
      .paginate(page, this.PER_PAGE)

    reports.baseUrl(request.url())

    return view.render('pages/reports/index', { reports })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({ bouncer, view, params }: HttpContextContract) {
    await bouncer.with('ReportPolicy').authorize('create')

    const report = await Report.query()
      .where('id', params.id)
      .preload('reason', (reason) => reason.select('name'))
      .preload('reporter', (user) =>
        user
          .select('id')
          .preload('profile', (profile) => profile.select('id', 'lastName', 'firstName'))
      )
      .firstOrFail()

    switch (report.entityType) {
      case ReportEntity.Association:
        await report.load('association', (association) =>
          association
            .select('id', 'name', 'schoolId')
            .preload('school', (school) => school.select('name'))
        )
        break

      case ReportEntity.Profile:
        await report.load('profile', (profile) =>
          profile
            .select('id', 'firstName', 'lastName', 'userId', 'schoolId')
            .preload('user', (user) => user.select('email'))
            .preload('school', (school) => school.select('name'))
        )
        break

      case ReportEntity.School:
        await report.load('school', (school) => school.select('id', 'name'))
        break
      default:
        break
    }

    return view.render('pages/reports/show', { report })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
