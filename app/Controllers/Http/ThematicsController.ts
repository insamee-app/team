import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thematic from 'App/Models/Thematic'
import ThematicStoreValidator from 'App/Validators/ThematicStoreValidator'
import ThematicUpdateValidator from 'App/Validators/ThematicUpdateValidator'

export default class ThematicsController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('viewList')

    const thematics = await Thematic.query().orderBy('name', 'asc')

    return view.render('pages/thematics/index', { thematics })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('create')

    return view.render('pages/thematics/create')
  }

  public async store({ request, bouncer, response }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('create')

    const data = await request.validate(ThematicStoreValidator)

    const thematic = await Thematic.create(data)

    return response.redirect().toRoute('ThematicsController.show', { id: thematic.id })
  }

  public async show({ view, bouncer, params }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('view')

    const thematic = await Thematic.findOrFail(params.id)

    return view.render('pages/thematics/show', { thematic })
  }

  public async edit({ view, bouncer, params }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('update')

    const thematic = await Thematic.findOrFail(params.id)

    return view.render('pages/thematics/edit', { thematic })
  }

  public async update({ request, response, bouncer, params }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('update')

    const thematic = await Thematic.findOrFail(params.id)

    const data = await request.validate(ThematicUpdateValidator)

    thematic.merge(data)

    await thematic.save()

    return response.redirect().toRoute('ThematicsController.show', { id: thematic.id })
  }

  public async destroy({ response, bouncer, params }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('delete')

    const thematic = await Thematic.findOrFail(params.id)

    await thematic.delete()

    return response.redirect().toRoute('ThematicsController.index')
  }
}
