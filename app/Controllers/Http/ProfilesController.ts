import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import Skill from 'App/Models/Skill'
import ProfileValidator from 'App/Validators/ProfileValidator'
import FocusInterest from 'App/Models/FocusInterest'
import Association from 'App/Models/Association'

export default class ProfilesController {
  private PER_PAGE = 10

  public async index({ view, request, bouncer }: HttpContextContract) {
    await bouncer.with('ProfilePolicy').authorize('viewList')

    const page = request.input('page') || 1
    const users = await User.query()
      .preload('profile', (profile) =>
        profile.preload('focusInterests', (focusInterest) => focusInterest.groupLimit(3))
      )
      .paginate(page, this.PER_PAGE)

    users.baseUrl(request.url())

    return view.render('pages/mee/index', { users })
  }

  public async show({ params, view, bouncer }: HttpContextContract) {
    await bouncer.with('ProfilePolicy').authorize('view')

    const user = await User.findOrFail(params.id)

    await user.load('profile', (profile) =>
      profile.preload('school').preload('skills').preload('focusInterests').preload('associations')
    )

    return view.render('pages/mee/show', { user })
  }

  public async edit({ params, view, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', user)

    await user.load('profile', (profile) =>
      profile.preload('school').preload('skills').preload('focusInterests').preload('associations')
    )
    const skills = await Skill.query().select('id', 'name').orderBy('name')
    const focusInterests = await FocusInterest.query().select('id', 'name').orderBy('name')
    const associations = await Association.query().select('id', 'name').orderBy('name')

    return view.render('pages/mee/edit', { user, skills, focusInterests, associations })
  }

  public async update({ request, params, response, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', user)

    const { skills, focusInterests, associations, ...payload } = await request.validate(
      ProfileValidator
    )

    const profile = await Profile.findBy('userId', user.id)
    profile!.merge(payload)

    await profile!.save()
    await profile?.related('skills').sync(skills || [])
    await profile?.related('focusInterests').sync(focusInterests || [])
    await profile?.related('associations').sync(associations || [])

    return response.redirect().toRoute('ProfilesController.show', { id: user.id })
  }
}
