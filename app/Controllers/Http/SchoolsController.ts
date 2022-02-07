import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Report from 'App/Models/Report'
import School from 'App/Models/School'
import SchoolStoreValidator from 'App/Validators/SchoolStoreValidator'
import SchoolUpdateValidator from 'App/Validators/SchoolUpdateValidator'

export default class SchoolsController {
  private PER_PAGE = 10

  public async index({ view, bouncer, request }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('viewList')

    const page = request.input('page', 1)

    const schools = await School.query()
      .withCount('associations')
      .withCount('profiles')
      .paginate(page, this.PER_PAGE)

    schools.baseUrl(request.url())

    return view.render('pages/schools/index', { schools })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('create')

    return view.render('pages/schools/create')
  }

  public async store({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('create')

    const payload = await request.validate(SchoolStoreValidator)

    const school = await School.create(payload)

    response.redirect().toRoute('SchoolsController.show', { id: school.id })
  }

  public async show({ request, params, view, bouncer, auth }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('view')

    const page = request.input('page', 1)

    const school = await School.findOrFail(params.id)
    const associations = await school
      .related('associations')
      .query()
      .preload('thematic', (thematic) => thematic.select('name'))
      .preload('school', (school) => school.select('name'))
      .paginate(page, this.PER_PAGE)
    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    associations.baseUrl(request.url())

    return view.render('pages/schools/show', { school, associations, report })
  }

  public async edit({ params, view, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('update')

    const school = await School.findOrFail(params.id)

    return view.render('pages/schools/edit', { school })
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('update')

    const payload = await request.validate(SchoolUpdateValidator)

    const school = await School.findOrFail(params.id)

    school.merge(payload)

    await school.save()

    response.redirect().toRoute('SchoolsController.show', { id: school.id })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('delete')

    const school = await School.findOrFail(params.id)

    await school.delete()

    response.redirect().toRoute('SchoolsController.index')
  }
}
