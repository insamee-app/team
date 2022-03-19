import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { TutoratKind } from 'App/Enums/TutoratKind'
import Report from 'App/Models/Report'
import School from 'App/Models/School'
import Subject from 'App/Models/Subject'
import Tutorat from 'App/Models/Tutorat'
import TutoratService from 'App/Services/TutoratService'
import TutoratStoreValidator from 'App/Validators/TutoratStoreValidator'
import TutoratUpdateValidator from 'App/Validators/TutoratUpdateValidator'

export default class TutoratsController {
  private PER_PAGE = 10

  public async index({ view, request, auth, bouncer }: HttpContextContract) {
    if (auth.isGuest) {
      return view.render('pages/tutorat/home')
    }

    await bouncer.with('TutoratPolicy').authorize('viewList')

    const { page = 1, ...qs } = request.qs()

    const tutorats = await Tutorat.query()
      .filter(qs)
      .withCount('interestedProfiles', (query) => query.as('interestedCount'))
      .withCount('participatingProfiles', (query) => query.as('participatingCount'))

      .preload('school')
      .preload('subject')
      .preload('creator', (query) =>
        query
          .select('id')
          .preload('profile', (query) => query.select('first_name', 'last_name', 'id', 'avatar'))
      )
      .orderBy('start_at', 'asc')
      .paginate(page, this.PER_PAGE)

    tutorats.baseUrl(request.url()).queryString(qs)

    const subjects = await Subject.query().select('id', 'name').orderBy('name')
    const schools = await School.query().select('id', 'name').orderBy('name')

    return view.render('pages/tutorat/index', { tutorats, subjects, schools })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('TutoratPolicy').authorize('create')

    const subjects = await Subject.query().select('id', 'name').orderBy('name')
    const schools = await School.query().select('id', 'name').orderBy('name')

    return view.render('pages/tutorat/create', { subjects, schools })
  }

  public async store({ request, response, bouncer, session, auth }: HttpContextContract) {
    await bouncer.with('TutoratPolicy').authorize('create')

    const {
      type = undefined,
      status,
      kind,
      startDate,
      startTime,
      endDate,
      endTime,
      ...payload
    } = await request.validate(TutoratStoreValidator)

    const startAt = TutoratService.toDateTime(startDate, startTime)
    const endAt = TutoratService.toDateTime(endDate, endTime)

    const tutorat = await Tutorat.create({
      type: type ? Number(type) : undefined,
      status: Number(status),
      kind: Number(kind),
      startAt,
      endAt,
      creatorId: auth.user?.id,
      ...payload,
    })

    session.flash('success', 'Tutorat créé avec succès')
    return response.redirect().toRoute('TutoratsController.show', { id: tutorat.id })
  }

  public async show({ request, view, params, auth, bouncer }: HttpContextContract) {
    await bouncer.with('TutoratPolicy').authorize('view')

    await auth.user?.load('profile')
    const tutorat = await Tutorat.query()
      .where('id', params.id)
      .withCount('interestedProfiles', (query) => query.as('interestedCount'))
      .withCount('participatingProfiles', (query) => query.as('participatingCount'))
      .preload('school')
      .preload('subject')
      .preload('creator', (query) =>
        query
          .select('id')
          .preload('profile', (query) => query.select('first_name', 'last_name', 'id', 'avatar'))
      )
      .firstOrFail()

    const { page = 1 } = request.qs()
    const participatingProfiles = await tutorat
      .related('participatingProfiles')
      .query()
      .select('id', 'avatar', 'first_name', 'last_name', 'role_id')
      .preload('role')
      .paginate(page, this.PER_PAGE)

    const tutoratProfile = await Database.query()
      .select('state')
      .from('profiles_tutorats')
      .where('profile_id', auth.user!.profile!.id)
      .andWhere('tutorat_id', tutorat.id)
      .first()
    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    return view.render('pages/tutorat/show', {
      tutorat,
      participatingProfiles,
      tutoratProfileState: tutoratProfile?.state,
      report,
    })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    const tutorat = await Tutorat.query().where('id', params.id).firstOrFail()
    await bouncer.with('TutoratPolicy').authorize('update', tutorat)

    const subjects = await Subject.query().select('id', 'name').orderBy('name')
    // const schools = await School.query().select('id', 'name').orderBy('name')

    await tutorat.load('school', (query) => query.select('id', 'name'))
    await tutorat.load('subject', (query) => query.select('id', 'name'))
    await tutorat.load('creator', (query) =>
      query
        .select('id')
        .preload('profile', (query) => query.select('first_name', 'last_name', 'id', 'avatar'))
    )

    return view.render('pages/tutorat/edit', { tutorat, subjects })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    const tutorat = await Tutorat.query().where('id', params.id).firstOrFail()
    await bouncer.with('TutoratPolicy').authorize('update', tutorat)

    const { type, status, startDate, startTime, endDate, endTime, ...payload } =
      await request.validate(TutoratUpdateValidator)

    if (tutorat.kind === TutoratKind.Offer) {
      const startAt = TutoratService.toDateTime(startDate!, startTime!)
      const endAt = TutoratService.toDateTime(endDate!, endTime!)
      tutorat.merge({
        startAt,
        endAt,
      })
    }

    tutorat.merge({
      type: Number(type),
      status: Number(status),
      ...payload,
    })

    await tutorat.save()

    session.flash('success', 'Tutorat modifié avec succès')
    return response.redirect().toRoute('TutoratsController.show', { id: params.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    const tutorat = await Tutorat.query().where('id', params.id).firstOrFail()
    await bouncer.with('TutoratPolicy').authorize('delete', tutorat)

    await tutorat.related('profiles').detach()
    await tutorat.delete()

    session.flash('success', 'Tutorat supprimé avec succès')
    return response.redirect().toRoute('TutoratsController.index')
  }
}
