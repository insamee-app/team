import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Association from 'App/Models/Association'
import Report from 'App/Models/Report'
import School from 'App/Models/School'
import Tag from 'App/Models/Tag'
import Thematic from 'App/Models/Thematic'
import AssociationStoreValidator from 'App/Validators/AssociationStoreValidator'
import AssociationUpdateValidator from 'App/Validators/AssociationUpdateValidator'

export default class AssociationsController {
  private PER_PAGE = 10

  public async index({ view, request, bouncer, auth }: HttpContextContract) {
    if (auth.isGuest) {
      return view.render('pages/associations/home')
    }

    await bouncer.with('AssociationPolicy').authorize('viewList')

    const page = request.input('page') || 1
    const associations = await Association.query()
      .preload('school')
      .preload('thematic')
      .preload('tags')
      .paginate(page, this.PER_PAGE)

    associations.baseUrl(request.url())

    return view.render('pages/associations/index', { associations })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('create')

    const schools = await School.query().select('id', 'name').orderBy('name')
    const thematics = await Thematic.query().select('id', 'name').orderBy('name')
    const tags = await Tag.query().select('id', 'name').orderBy('name')

    return view.render('pages/associations/create', { schools, thematics, tags })
  }

  public async store({ request, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('create')

    const { tags, ...payload } = await request.validate(AssociationStoreValidator)

    const association = await Association.create(payload)
    await association.related('tags').sync(tags || [])

    session.flash('success', 'Association créée avec succès')
    return response.redirect().toRoute('AssociationsController.show', { id: association.id })
  }

  public async show({ view, params, bouncer, auth }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('view')

    const association = await Association.query()
      .where('id', params.id)
      .preload('school')
      .preload('thematic')
      .preload('tags')
      .firstOrFail()
    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    return view.render('pages/associations/show', { association, report })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('update')

    const association = await Association.findOrFail(params.id)

    const schools = await School.query().select('id', 'name').orderBy('name')
    const thematics = await Thematic.query().select('id', 'name').orderBy('name')
    const tags = await Tag.query().select('id', 'name').orderBy('name')

    await association.load('school')
    await association.load('tags')
    await association.load('thematic')

    return view.render('pages/associations/edit', { association, schools, thematics, tags })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('update')

    const association = await Association.findOrFail(params.id)

    const { tags, ...payload } = await request.validate(AssociationUpdateValidator)

    association.merge(payload)
    await association.save()
    await association.related('tags').sync(tags || [])

    session.flash('success', 'Association modifiée avec succès')
    return response.redirect().toRoute('AssociationsController.show', { id: association.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('delete')

    const association = await Association.findOrFail(params.id)

    await association.related('tags').detach()
    await association.delete()

    session.flash('success', 'Association supprimée avec succès')
    return response.redirect().toRoute('AssociationsController.index')
  }
}
