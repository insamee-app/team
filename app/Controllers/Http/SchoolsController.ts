import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserStatus } from 'App/Enums/UserStatus'
import Report from 'App/Models/Report'
import School from 'App/Models/School'
import User from 'App/Models/User'
import SchoolStoreValidator from 'App/Validators/SchoolStoreValidator'
import SchoolUpdateValidator from 'App/Validators/SchoolUpdateValidator'

export default class SchoolsController {
  private PER_PAGE = 10

  public async index({ view, bouncer, request }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('viewList')

    const page = request.input('page', 1)

    const schools = await School.query()
      .withCount('associations')
      .withCount('profiles', (profile) =>
        profile.whereNotIn('user_id', User.query().select('id').where('status', UserStatus.Pending))
      )
      .paginate(page, this.PER_PAGE)

    schools.baseUrl(request.url())

    return view.render('pages/schools/index', { schools })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('create')

    return view.render('pages/schools/create')
  }

  public async store({ response, request, bouncer, session }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('create')

    const payload = await request.validate(SchoolStoreValidator)

    const school = await School.create(payload)

    session.flash('success', 'Ecole créée avec succès')
    response.redirect().toRoute('SchoolsController.show', { id: school.id })
  }

  public async show({ request, params, view, bouncer, auth }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('view')

    const page = request.input('page', 1)

    const school = await School.query().where('id', params.id).firstOrFail()
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
    const school = await School.query().where('id', params.id).firstOrFail()
    await bouncer.with('SchoolPolicy').authorize('update', school)

    return view.render('pages/schools/edit', { school })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    const school = await School.query().where('id', params.id).firstOrFail()
    await bouncer.with('SchoolPolicy').authorize('update', school)

    const payload = await request.validate(SchoolUpdateValidator)

    school.merge(payload)

    await school.save()

    session.flash('success', 'Ecole modifiée avec succès')
    response.redirect().toRoute('SchoolsController.show', { id: school.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('delete')

    const school = await School.query().where('id', params.id).firstOrFail()

    await school.delete()

    session.flash('success', 'Ecole supprimée avec succès')
    response.redirect().toRoute('SchoolsController.index')
  }
}
