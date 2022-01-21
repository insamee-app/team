import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Association from 'App/Models/Association'
import School from 'App/Models/School'
import AssociationStoreValidator from 'App/Validators/AssociationStoreValidator'
import AssociationUpdateValidator from 'App/Validators/AssociationUpdateValidator'

export default class AssociationsController {
  private PER_PAGE = 10

  public async index({ view, request, bouncer }: HttpContextContract) {
    const page = request.input('page') || 1
    const associations = await Association.query().preload('school').paginate(page, this.PER_PAGE)

    associations.baseUrl(request.url())

    return view.render('pages/associations/index', { associations })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    const schools = await School.all()

    return view.render('pages/associations/create', { schools })
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    const payload = await request.validate(AssociationStoreValidator)

    const association = await Association.create(payload)

    return response.redirect().toRoute('AssociationsController.show', { id: association.id })
  }

  public async show({ view, params, bouncer }: HttpContextContract) {
    const association = await Association.findOrFail(params.id)

    await association.load('school')

    return view.render('pages/associations/show', { association })
  }

  public async edit({ view, params }: HttpContextContract) {
    const association = await Association.findOrFail(params.id)

    await association.load('school')

    return view.render('pages/associations/edit', { association })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    const association = await Association.findOrFail(params.id)

    const payload = await request.validate(AssociationUpdateValidator)

    association.merge(payload)
    await association.save()

    return response.redirect().toRoute('AssociationsController.show', { id: association.id })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    const association = await Association.findOrFail(params.id)

    await association.delete()

    return response.redirect().toRoute('AssociationsController.index')
  }
}
