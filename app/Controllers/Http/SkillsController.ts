import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Skill from 'App/Models/Skill'
import SkillStoreValidator from 'App/Validators/SkillStoreValidator'
import SkillUpdateValidator from 'App/Validators/SkillUpdateValidator'

export default class SkillsController {
  private PER_PAGE = 10

  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('viewList')

    const skills = await Skill.query().orderBy('name', 'asc')

    return view.render('pages/skills/index', { skills })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('create')

    return view.render('pages/skills/create')
  }

  public async store({ response, request, bouncer, session }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('create')

    const data = await request.validate(SkillStoreValidator)

    const skill = await Skill.create(data)

    session.flash('success', 'Compétence créée avec succès')
    return response.redirect().toRoute('SkillsController.show', { id: skill.id })
  }

  public async show({ request, view, params, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('view')

    const { page, ...qs } = request.qs()

    const skill = await Skill.query().where('id', params.id).firstOrFail()
    const profiles = await skill
      .related('profiles')
      .query()
      .preload('focusInterests')
      .paginate(page, this.PER_PAGE)

    profiles.baseUrl(request.url()).queryString(qs)

    return view.render('pages/skills/show', { skill, profiles })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('update')

    const skill = await Skill.query().where('id', params.id).firstOrFail()

    return view.render('pages/skills/edit', { skill })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('update')

    const skill = await Skill.query().where('id', params.id).firstOrFail()

    const data = await request.validate(SkillUpdateValidator)

    skill.merge(data)

    await skill.save()

    session.flash('success', 'Compétence modifiée avec succès')
    return response.redirect().toRoute('SkillsController.show', { id: skill.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('delete')

    const skill = await Skill.query().where('id', params.id).firstOrFail()

    await skill.delete()

    session.flash('success', 'Compétence supprimée avec succès')
    return response.redirect().toRoute('SkillsController.index')
  }
}
