import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { SubjectType } from 'App/Enums/SubjectType'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import Association from 'App/Models/Association'
import FocusInterest from 'App/Models/FocusInterest'
import Profile from 'App/Models/Profile'
import Report from 'App/Models/Report'
import Role from 'App/Models/Role'
import School from 'App/Models/School'
import Skill from 'App/Models/Skill'
import Subject from 'App/Models/Subject'
import User from 'App/Models/User'
import ProfileValidator from 'App/Validators/ProfileValidator'
export default class ProfilesController {
  private PER_PAGE = 10

  public async index({ view, request, bouncer, auth }: HttpContextContract) {
    if (auth.isGuest) {
      return view.render('pages/mee/home')
    }

    await bouncer.with('ProfilePolicy').authorize('viewList')

    const { page = 1, ...qs } = request.qs()

    const profiles = await Profile.query()
      .filter(qs)
      .preload('focusInterests')
      .preload('role')
      .whereNotIn('user_id', User.query().select('id').where('status', UserStatus.Pending))
      .paginate(page, this.PER_PAGE)

    profiles.baseUrl(request.url()).queryString(qs)

    const schools = await School.query().select('id', 'name').orderBy('name')
    const skills = await Skill.query().select('id', 'name').orderBy('name')
    const focusInterests = await FocusInterest.query().select('id', 'name').orderBy('name')

    return view.render('pages/mee/index', { profiles, schools, skills, focusInterests })
  }

  public async show({ params, view, bouncer, auth }: HttpContextContract) {
    await bouncer.with('ProfilePolicy').authorize('view')

    // A profile, if he's blocked, can only be viewed by an admin or a moderator
    let queryProfile: ModelQueryBuilderContract<typeof Profile, Profile>
    if (auth.user!.role === UserRole.SuperAdmin || auth.user!.role === UserRole.Moderator) {
      queryProfile = Profile.withBlockedUser().preload('user', (user) => {
        user['ignoreBlocked'] = false
        user.select('id', 'email', 'deleted_at')
      })
    } else {
      queryProfile = Profile.query().preload('user', (user) =>
        user.select('id', 'email', 'deleted_at')
      )
    }

    const profile = await queryProfile
      .select(
        'id',
        'first_name',
        'last_name',
        'avatar',
        'graduation_year',
        'bio',
        'role_id',
        'user_id',
        'school_id',
        'facebook_url',
        'twitter_url',
        'instagram_url',
        'linkedin_url'
      )
      .where('id', params.id)
      .preload('school', (school) => school.select('id', 'name', 'picture'))
      .preload('skills', (skill) => skill.select('id', 'name'))
      .preload('focusInterests', (focusInterest) => focusInterest.select('id', 'name'))
      .preload('associations', (association) => association.select('id', 'name', 'picture'))
      .preload('role', (role) => role.select('id', 'name'))
      .preload('preferredSubjects', (subject) => subject.select('id', 'name'))
      .firstOrFail()
    const report = await Report.query()
      .select('id')
      .where('reporterId', auth.user!.id)
      .where('entityId', params.id)
      .whereNull('resolvedAt')
      .first()

    return view.render('pages/mee/show', { profile, report })
  }

  public async edit({ params, view, bouncer }: HttpContextContract) {
    const profile = await Profile.query().where('id', params.id).firstOrFail()
    await bouncer.with('ProfilePolicy').authorize('update', profile)

    await profile.load('user')
    await profile.load('school')
    await profile.load('skills')
    await profile.load('focusInterests')
    await profile.load('associations')
    await profile.load('preferredSubjects')

    const skills = await Skill.query().select('id', 'name').orderBy('name')
    const focusInterests = await FocusInterest.query().select('id', 'name').orderBy('name')
    const associations = await Association.query().select('id', 'name').orderBy('name')
    const roles = await Role.query().select('id', 'name').orderBy('name')
    const subjects = await Subject.query().select('id', 'name').orderBy('name')

    return view.render('pages/mee/edit', {
      profile,
      skills,
      focusInterests,
      associations,
      roles,
      subjects,
    })
  }

  public async update({ request, params, response, bouncer, session }: HttpContextContract) {
    const profile = await Profile.query().where('id', params.id).firstOrFail()
    await bouncer.with('ProfilePolicy').authorize('update', profile)

    const {
      skills = [],
      focusInterests = [],
      preferredSubjects = [],
      associations = [],
      ...payload
    } = await request.validate(ProfileValidator)

    profile!.merge(payload as unknown as any)

    await profile!.save()
    await profile?.related('skills').sync(skills)
    await profile?.related('focusInterests').sync(focusInterests)
    await profile?.related('associations').sync(associations)

    const subjects = {}
    for (const subject of preferredSubjects) {
      subjects[subject] = { type: SubjectType.Favorite }
    }
    await profile?.related('preferredSubjects').sync(subjects)

    session.flash('success', 'Profil mis ?? jour avec succ??s')
    return response.redirect().toRoute('ProfilesController.show', { id: params.id })
  }
}
