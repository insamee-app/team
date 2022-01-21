import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Association from 'App/Models/Association'
import AssociationStoreValidator from 'App/Validators/AssociationStoreValidator'
import AssociationUpdateValidator from 'App/Validators/AssociationUpdateValidator'

export default class AssociationsController {
  public async index({ view, bouncer }: HttpContextContract) {
    // TODO: il faut designer la pagination et cette page
    const associations = await Association.all()

    return view.render('pages/associations/index', { associations })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    return view.render('pages/associations/create')
  }

  public async store({ request, response, bouncer }: HttpContextContract) {
    const payload = await request.validate(AssociationStoreValidator)

    const association = await Association.create(payload)

    return response.redirect().toRoute('AssociationsController.show', { id: association.id })
  }

  public async show({ view, params, bouncer }: HttpContextContract) {
    const association = await Association.findOrFail(params.id)

    return view.render('pages/associations/show', { association })
  }

  public async edit({ view, params }: HttpContextContract) {
    const association = await Association.findOrFail(params.id)

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
