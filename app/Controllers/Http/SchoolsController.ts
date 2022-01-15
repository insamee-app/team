import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import School from 'App/Models/School'
import SchoolValidator from 'App/Validators/SchoolValidator'

export default class SchoolsController {
  public async index({ view }: HttpContextContract) {
    const schools = await School.all()

    return view.render('pages/schools/index', { schools })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/schools/create')
  }

  public async store({ response, request }: HttpContextContract) {
    const payload = await request.validate(SchoolValidator)

    const school = await School.create(payload)

    response.redirect().toRoute('SchoolsController.show', { id: school.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const school = await School.findOrFail(params.id)

    return view.render('pages/schools/show', { school })
  }

  public async edit({ params, view }: HttpContextContract) {
    const school = await School.findOrFail(params.id)

    return view.render('pages/schools/edit', { school })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = await request.validate(SchoolValidator)

    const school = await School.findOrFail(params.id)

    school.merge(payload)

    await school.save()

    response.redirect().toRoute('SchoolsController.show', { id: school.id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const school = await School.findOrFail(params.id)

    await school.delete()

    response.redirect().toRoute('SchoolsController.index')
  }
}
