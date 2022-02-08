import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import Skill from 'App/Models/Skill'
import ProfileValidator from 'App/Validators/ProfileValidator'
import FocusInterest from 'App/Models/FocusInterest'
import Association from 'App/Models/Association'
import Report from 'App/Models/Report'

export default class ProfilesController {
  private PER_PAGE = 10

  public async index({ view, request, bouncer, auth }: HttpContextContract) {
    if (auth.isGuest) {
      return view.render('pages/mee/home')
    }

    await bouncer.with('ProfilePolicy').authorize('viewList')

    const page = request.input('page', 1)

    const profiles = await Profile.query()
      .preload('focusInterests', (focusInterest) => focusInterest.groupLimit(3))
      .paginate(page, this.PER_PAGE)

    profiles.baseUrl(request.url())

    return view.render('pages/mee/index', { profiles })
  }

  public async show({ params, view, bouncer, auth }: HttpContextContract) {
    await bouncer.with('ProfilePolicy').authorize('view')

    const profile = await Profile.query()
      .where('id', params.id)
      .preload('school')
      .preload('skills')
      .preload('focusInterests')
      .preload('associations')
      .preload('user')
      .firstOrFail()
    const report = await Report.query()
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    return view.render('pages/mee/show', { profile, report })
  }

  public async edit({ params, view, bouncer }: HttpContextContract) {
    const profile = await Profile.firstOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', profile)

    await profile.load('user')
    await profile.load('school')
    await profile.load('skills')
    await profile.load('focusInterests')
    await profile.load('associations')

    const skills = await Skill.query().select('id', 'name').orderBy('name')
    const focusInterests = await FocusInterest.query().select('id', 'name').orderBy('name')
    const associations = await Association.query().select('id', 'name').orderBy('name')

    return view.render('pages/mee/edit', { profile, skills, focusInterests, associations })
  }

  public async update({ request, params, response, bouncer }: HttpContextContract) {
    const profile = await Profile.firstOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', profile)

    const { skills, focusInterests, associations, ...payload } = await request.validate(
      ProfileValidator
    )

    profile!.merge(payload)

    await profile!.save()
    await profile?.related('skills').sync(skills || [])
    await profile?.related('focusInterests').sync(focusInterests || [])
    await profile?.related('associations').sync(associations || [])

    return response.redirect().toRoute('ProfilesController.show', { id: params.id })
  }
}
