import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { EventStatus } from 'App/Enums/EventStatus'
import Association from 'App/Models/Association'
import Event from 'App/Models/Event'
import Report from 'App/Models/Report'
import School from 'App/Models/School'
import EventsService from 'App/Services/EventsService'
import EventStoreValidator from 'App/Validators/EventStoreValidator'
import EventUpdateValidator from 'App/Validators/EventUpdateValidator'

export default class EventsController {
  private PER_PAGE = 10

  public async index({ view, request, bouncer, auth }: HttpContextContract) {
    if (auth.isGuest) {
      return view.render('pages/events/home')
    }

    await bouncer.with('EventPolicy').authorize('viewList')

    const { page = 1, ...qs } = request.qs()

    const events = await Event.query()
      .filter(qs)
      .withCount('interestedProfiles', (query) => query.as('interestedCount'))
      .withCount('participatingProfiles', (query) => query.as('participatingCount'))
      .paginate(page, this.PER_PAGE)

    events.baseUrl(request.url()).queryString(qs)

    const associations = await Association.query().select('id', 'name').orderBy('name')
    const schools = await School.query().select('id', 'name').orderBy('name')

    return view.render('pages/events/index', { events, associations, schools })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('create')

    const schools = await School.query().select('id', 'name').orderBy('name')
    const associations = await Association.query().select('id', 'name').orderBy('name')

    return view.render('pages/events/create', { schools, associations })
  }

  public async store({ request, response, bouncer, session, auth }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('create')

    const {
      startDate,
      startTime,
      endDate,
      endTime,
      type,
      associations = [],
      schools = [],
      hosts = [],
      ...data
    } = await request.validate(EventStoreValidator)

    const startAt = EventsService.toDateTime(startDate, startTime)
    const endAt = EventsService.toDateTime(endDate, endTime)

    const event = await Event.create({
      ...data,
      type: Number(type),
      startAt,
      endAt,
      status: EventStatus.Published,
      creatorId: auth.user!.id,
    })

    await event.related('organizingSchools').attach(schools)
    await event.related('organizingAssociations').attach(associations)
    await event.related('hostSchools').attach(hosts)

    session.flash('success', 'Evènement créé avec succès')
    return response.redirect().toRoute('EventsController.show', { id: event.id })
  }

  public async show({ view, params, bouncer, auth }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('view')

    await auth.user?.load('profile')
    const event = await Event.query()
      .preload('creator', (creator) =>
        creator.preload('profile', (profile) => profile.select('id', 'avatar'))
      )
      .preload('organizingAssociations', (association) => association.select('id', 'picture'))
      .preload('organizingSchools', (school) => school.select('id', 'picture'))
      .preload('hostSchools', (query) => query.select('id'))
      .withCount('interestedProfiles', (query) => query.as('interestedCount'))
      .withCount('participatingProfiles', (query) => query.as('participatingCount'))
      .where('id', params.id)
      .firstOrFail()
    const eventProfile = await Database.query()
      .select('state')
      .from('profiles_events')
      .where('profile_id', auth.user!.profile!.id)
      .andWhere('event_id', event.id)
      .first()
    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    return view.render('pages/events/show', {
      event,
      eventProfileState: eventProfile?.state,
      report,
    })
  }

  public async edit({ view, params, bouncer, auth }: HttpContextContract) {
    const event = await Event.query().preload('creator').where('id', params.id).firstOrFail()

    await auth.user?.load('profile')
    await event.load('hostSchools', (query) => query.select('id', 'name'))
    await bouncer.with('EventPolicy').authorize('update', event)

    await event.load('organizingAssociations')
    await event.load('organizingSchools')
    await event.load('hostSchools')

    const schools = await School.query().select('id', 'name').orderBy('name')
    const associations = await Association.query().select('id', 'name').orderBy('name')

    return view.render('pages/events/edit', { event, schools, associations })
  }

  public async update({ request, response, bouncer, session, params, auth }: HttpContextContract) {
    const event = await Event.query().where('id', params.id).firstOrFail()

    await auth.user?.load('profile')
    await event.load('hostSchools', (query) => query.select('id'))
    await bouncer.with('EventPolicy').authorize('update', event)

    const {
      startDate,
      startTime,
      endDate,
      endTime,
      type,
      status,
      associations = [],
      schools = [],
      hosts = [],
      ...data
    } = await request.validate(EventUpdateValidator)

    const startAt = EventsService.toDateTime(startDate, startTime)
    const endAt = EventsService.toDateTime(endDate, endTime)

    event.merge({
      ...data,
      status: Number(status),
      type: Number(type),
      startAt,
      endAt,
    })

    await event.save()
    await event.related('organizingSchools').sync(schools)
    await event.related('organizingAssociations').sync(associations)
    await event.related('hostSchools').sync(hosts)

    session.flash('success', 'Evènement modifié avec succès')
    return response.redirect().toRoute('EventsController.show', { id: event.id })
  }

  public async destroy({ params, response, bouncer, session, auth }: HttpContextContract) {
    const event = await Event.query().where('id', params.id).firstOrFail()
    await auth.user?.load('profile')
    await event.load('hostSchools', (query) => query.select('id'))
    await bouncer.with('EventPolicy').authorize('delete', event)

    await event.delete()

    session.flash('success', 'Evènement supprimé avec succès')
    return response.redirect().toRoute('EventsController.index')
  }
}
