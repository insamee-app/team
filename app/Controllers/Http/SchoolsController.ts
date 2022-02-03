import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import School from 'App/Models/School'
import SchoolStoreValidator from 'App/Validators/SchoolStoreValidator'

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

  public async show({ params, view, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('view')

    const school = await School.findOrFail(params.id)

    return view.render('pages/schools/show', { school })
  }

  public async edit({ params, view, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('update')

    const school = await School.findOrFail(params.id)

    return view.render('pages/schools/edit', { school })
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('update')

    // const payload = await request.validate(Validator)

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
