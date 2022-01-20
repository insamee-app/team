import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import Skill from 'App/Models/Skill'
import ProfileValidator from 'App/Validators/ProfileValidator'

export default class ProfilesController {
  public async show({ params, view, bouncer }: HttpContextContract) {
    await bouncer.with('ProfilePolicy').authorize('view')

    const user = await User.findOrFail(params.id)

    await user.load('profile', (profile) => profile.preload('school').preload('skills'))

    return view.render('pages/mee/show', { user })
  }

  public async edit({ params, view, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', user)

    await user.load('profile', (profile) => profile.preload('school').preload('skills'))
    const skills = await Skill.query().select('id', 'name').orderBy('name')

    return view.render('pages/mee/edit', { user, skills })
  }

  public async update({ request, params, response, bouncer }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await bouncer.with('ProfilePolicy').authorize('update', user)

    const { skills, ...payload } = await request.validate(ProfileValidator)

    const profile = await Profile.findBy('userId', user.id)
    profile!.merge(payload)

    await profile!.save()
    await profile?.related('skills').sync(skills || [])

    return response.redirect().toRoute('ProfilesController.show', { id: user.id })
  }
}
