import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import Association from 'App/Models/Association'
import Report from 'App/Models/Report'
import School from 'App/Models/School'
import Tag from 'App/Models/Tag'
import Thematic from 'App/Models/Thematic'
import User from 'App/Models/User'
import AssociationStoreValidator from 'App/Validators/AssociationStoreValidator'
import AssociationUpdateValidator from 'App/Validators/AssociationUpdateValidator'

export default class AssociationsController {
  private PER_PAGE = 10

  public async index({ up, view, request, bouncer, auth }: HttpContextContract) {
    if (auth.isGuest) {
      return view.render('pages/associations/home')
    }

    await bouncer.with('AssociationPolicy').authorize('viewList')

    let associations
    if (up.targetIncludes('[layout-list]') || up.targetIncludes('[layout-main]')) {
      const { page = 1, ...qs } = request.qs()

      associations = await Association.query()
        .filter(qs)
        .preload('school')
        .preload('thematic')
        .preload('tags')
        .paginate(page, this.PER_PAGE)

      associations.baseUrl(request.url()).queryString(qs)
    }

    let schools
    let thematics
    let tags
    if (up.targetIncludes('[layout-filters]') || up.targetIncludes('[layout-main]')) {
      schools = await School.query().select('id', 'name').orderBy('name')
      thematics = await Thematic.query().select('id', 'name').orderBy('name')
      tags = await Tag.query().select('id', 'name').orderBy('name')
    }

    return view.render('pages/associations/index', { associations, schools, thematics, tags })
  }

  public async create({ view, bouncer, auth }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('create')

    await auth.user!.load('profile')
    const schools = await School.query()
      .select('id', 'name')
      .orderBy('name')
      .if(
        auth.user!.role === UserRole.AssociativeManager ||
          auth.user!.role === UserRole.Supervisor ||
          auth.user!.role === UserRole.Admin,
        (query) => query.where('id', auth.user!.profile.schoolId)
      )
    const thematics = await Thematic.query().select('id', 'name').orderBy('name')
    const tags = await Tag.query().select('id', 'name').orderBy('name')

    return view.render('pages/associations/create', { schools, thematics, tags })
  }

  public async store({ request, response, bouncer, session }: HttpContextContract) {
    const { tags, ...payload } = await request.validate(AssociationStoreValidator)

    const association = new Association()
    association.merge(payload)
    await bouncer.with('AssociationPolicy').authorize('store', association)

    await association.save()
    await association.related('tags').sync(tags || [])

    session.flash('success', 'Association cr????e avec succ??s')
    return response.redirect().toRoute('AssociationsController.show', { id: association.id })
  }

  public async show({ view, params, bouncer, auth, request }: HttpContextContract) {
    await bouncer.with('AssociationPolicy').authorize('view')

    const { page, ...qs } = request.qs()

    const association = await Association.query()
      .where('id', params.id)
      .preload('school')
      .preload('thematic')
      .preload('tags')
      .firstOrFail()
    const profiles = await association
      .related('profiles')
      .query()
      .preload('focusInterests')
      .whereNotIn('user_id', User.query().select('id').where('status', UserStatus.Pending))
      .paginate(page, this.PER_PAGE)

    profiles.baseUrl(request.url()).queryString(qs)

    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    return view.render('pages/associations/show', { association, report, profiles })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    const association = await Association.query().where('id', params.id).firstOrFail()
    await bouncer.with('AssociationPolicy').authorize('update', association)

    const schools = await School.query().select('id', 'name').orderBy('name')
    const thematics = await Thematic.query().select('id', 'name').orderBy('name')
    const tags = await Tag.query().select('id', 'name').orderBy('name')

    await association.load('school')
    await association.load('tags')
    await association.load('thematic')

    return view.render('pages/associations/edit', { association, schools, thematics, tags })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    const association = await Association.query().where('id', params.id).firstOrFail()
    await bouncer.with('AssociationPolicy').authorize('update', association)

    const { tags, ...payload } = await request.validate(AssociationUpdateValidator)

    association.merge(payload)
    await association.save()
    await association.related('tags').sync(tags || [])

    session.flash('success', 'Association modifi??e avec succ??s')
    return response.redirect().toRoute('AssociationsController.show', { id: association.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    const association = await Association.query().where('id', params.id).firstOrFail()
    await bouncer.with('AssociationPolicy').authorize('delete', association)

    await association.related('tags').detach()
    await association.delete()

    session.flash('success', 'Association supprim??e avec succ??s')
    return response.redirect().toRoute('AssociationsController.index')
  }
}
