import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import Skill from 'App/Models/Skill'
import ProfileValidator from 'App/Validators/ProfileValidator'
import FocusInterest from 'App/Models/FocusInterest'

export default class ProfilesController {
  public async show({ params, view, bouncer }: HttpContextContract) {
    await bouncer.with('ProfilePolicy').authorize('view')

    const user = await User.findOrFail(params.id)

    await user.load('profile', (profile) =>
      profile.preload('school').preload('skills').preload('focusInterests')
    )

    return view.render('pages/mee/show', { user })
  }

  public async edit({ params, view, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', user)

    await user.load('profile', (profile) =>
      profile.preload('school').preload('skills').preload('focusInterests')
    )
    const skills = await Skill.query().select('id', 'name').orderBy('name')
    const focusInterests = await FocusInterest.query().select('id', 'name').orderBy('name')

    return view.render('pages/mee/edit', { user, skills, focusInterests })
  }

  public async update({ request, params, response, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', user)

    const { skills, focusInterests, ...payload } = await request.validate(ProfileValidator)

    const profile = await Profile.findBy('userId', user.id)
    profile!.merge(payload)

    await profile!.save()
    await profile?.related('skills').sync(skills || [])
    await profile?.related('focusInterests').sync(focusInterests || [])

    return response.redirect().toRoute('ProfilesController.show', { id: user.id })
  }
}
