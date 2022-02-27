import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EventStatus } from 'App/Enums/EventStatus'
import Association from 'App/Models/Association'
import Event from 'App/Models/Event'
import Report from 'App/Models/Report'
import School from 'App/Models/School'
import EventsService from 'App/Services/EventsService'
import EventStoreValidator from 'App/Validators/EventStoreValidator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class EventsController {
  private PER_PAGE = 10

  public async index({ view, request, bouncer, auth }: HttpContextContract) {
    if (auth.isGuest) {
      return view.render('pages/events/home')
    }

    await bouncer.with('EventPolicy').authorize('viewList')

    const { page = 1, ...qs } = request.qs()

    const events = await Event.query()
      .preload('creator')
      .preload('organizerAssociation')
      .preload('organizerSchool')
      .paginate(page, this.PER_PAGE)

    events.baseUrl(request.url()).queryString(qs)

    return view.render('pages/events/index', { events })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('create')

    // TODO: use user role to filter schools
    const schools = await School.query().select('id', 'name').orderBy('name')
    // TODO: use user role to filter associations
    const associations = await Association.query().select('id', 'name').orderBy('name')

    return view.render('pages/events/create', { schools, associations })
  }

  public async store({ request, response, bouncer, session, auth }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('create')

    const { startDate, startTime, endDate, endTime, type, ...data } = await request.validate(
      EventStoreValidator
    )

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

    session.flash('success', 'Evènement créé avec succès')
    return response.redirect().toRoute('EventsController.show', { id: event.id })
  }

  public async show({ view, params, bouncer, auth }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('view')

    await auth.user?.load('profile')
    const event = await Event.query()
      .preload('creator', (creator) =>
        creator.preload('profile', (profile) => profile.select('id', 'first_name', 'last_name'))
      )
      .preload('organizerAssociation')
      .preload('organizerSchool')
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

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('update')

    const event = await Event.query()
      .preload('creator')
      .preload('organizerAssociation')
      .preload('organizerSchool')
      .where('id', params.id)
      .firstOrFail()

    // TODO: use user role to filter schools
    const schools = await School.query().select('id', 'name').orderBy('name')
    // TODO: use user role to filter associations
    const associations = await Association.query().select('id', 'name').orderBy('name')

    return view.render('pages/events/edit', { event, schools, associations })
  }

  public async update({ request, response, bouncer, session, params }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('update')

    const { startDate, startTime, endDate, endTime, type, ...data } = await request.validate(
      EventStoreValidator
    )

    const startAt = EventsService.toDateTime(startDate, startTime)
    const endAt = EventsService.toDateTime(endDate, endTime)

    const event = await Event.query().where('id', params.id).firstOrFail()

    event.merge({
      ...data,
      type: Number(type),
      startAt,
      endAt,
      status: EventStatus.Published,
    })

    await event.save()

    session.flash('success', 'Evènement modifié avec succès')
    return response.redirect().toRoute('EventsController.show', { id: event.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('EventPolicy').authorize('delete')

    const event = await Event.query().where('id', params.id).firstOrFail()

    await event.delete()

    session.flash('success', 'Evènement supprimé avec succès')
    return response.redirect().toRoute('EventsController.index')
  }
}
