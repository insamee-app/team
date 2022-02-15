import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thematic from 'App/Models/Thematic'
import ThematicStoreValidator from 'App/Validators/ThematicStoreValidator'
import ThematicUpdateValidator from 'App/Validators/ThematicUpdateValidator'

export default class ThematicsController {
  private PER_PAGE = 10

  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('viewList')

    const thematics = await Thematic.query().orderBy('name', 'asc')

    return view.render('pages/thematics/index', { thematics })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('create')

    return view.render('pages/thematics/create')
  }

  public async store({ request, bouncer, response, session }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('create')

    const data = await request.validate(ThematicStoreValidator)

    const thematic = await Thematic.create(data)

    session.flash('success', 'Thématique créée avec succès')
    return response.redirect().toRoute('ThematicsController.show', { id: thematic.id })
  }

  public async show({ request, view, bouncer, params }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('view')

    const page = request.input('page', 1)

    const thematic = await Thematic.query().where(params.id).firstOrFail()
    const associations = await thematic
      .related('associations')
      .query()
      .preload('school')
      .preload('thematic')
      .preload('tags', (tags) => tags.groupLimit(3))
      .orderBy('name', 'asc')
      .paginate(page, this.PER_PAGE)

    associations.baseUrl(request.url())

    return view.render('pages/thematics/show', { thematic, associations })
  }

  public async edit({ view, bouncer, params }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('update')

    const thematic = await Thematic.query().where(params.id).firstOrFail()

    return view.render('pages/thematics/edit', { thematic })
  }

  public async update({ request, response, bouncer, params, session }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('update')

    const thematic = await Thematic.query().where(params.id).firstOrFail()

    const data = await request.validate(ThematicUpdateValidator)

    thematic.merge(data)

    await thematic.save()

    session.flash('success', 'Thématique modifiée avec succès')
    return response.redirect().toRoute('ThematicsController.show', { id: thematic.id })
  }

  public async destroy({ response, bouncer, params, session }: HttpContextContract) {
    await bouncer.with('ThematicPolicy').authorize('delete')

    const thematic = await Thematic.query().where(params.id).firstOrFail()

    await thematic.delete()

    session.flash('success', 'Thématique supprimée avec succès')
    return response.redirect().toRoute('ThematicsController.index')
  }
}
