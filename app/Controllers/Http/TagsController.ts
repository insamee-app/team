import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tag from 'App/Models/Tag'
import TagStoreValidator from 'App/Validators/TagStoreValidator'
import TagUpdateValidator from 'App/Validators/TagUpdateValidator'

export default class TagsController {
  private PER_PAGE = 10

  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('viewList')

    const tags = await Tag.query().orderBy('name', 'asc')

    return view.render('pages/tags/index', { tags })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('create')

    return view.render('pages/tags/create')
  }

  public async store({ request, bouncer, response, session }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('create')

    const data = await request.validate(TagStoreValidator)

    const tag = await Tag.create(data)

    session.flash('success', 'Tag créé avec succès')
    return response.redirect().toRoute('TagsController.show', { id: tag.id })
  }

  public async show({ request, view, bouncer, params }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('view')

    const page = request.input('page', 1)

    const tag = await Tag.query().where(params.id).firstOrFail()
    const associations = await tag
      .related('associations')
      .query()
      .preload('school')
      .preload('thematic')
      .preload('tags', (tags) => tags.groupLimit(3))
      .orderBy('name', 'asc')
      .paginate(page, this.PER_PAGE)

    associations.baseUrl(request.url())

    return view.render('pages/tags/show', { tag, associations })
  }

  public async edit({ view, bouncer, params }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('update')

    const tag = await Tag.query().where(params.id).firstOrFail()

    return view.render('pages/tags/edit', { tag })
  }

  public async update({ request, response, bouncer, params, session }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('update')

    const tag = await Tag.query().where(params.id).firstOrFail()

    const data = await request.validate(TagUpdateValidator)

    tag.merge(data)

    await tag.save()

    session.flash('success', 'Tag modifié avec succès')
    return response.redirect().toRoute('TagsController.show', { id: tag.id })
  }

  public async destroy({ response, bouncer, params, session }: HttpContextContract) {
    await bouncer.with('TagPolicy').authorize('delete')

    const tag = await Tag.query().where(params.id).firstOrFail()

    await tag.delete()

    session.flash('success', 'Tag supprimé avec succès')
    return response.redirect().toRoute('TagsController.index')
  }
}
