import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Skill from 'App/Models/Skill'
import SkillStoreValidator from 'App/Validators/SkillStoreValidator'
import SkillUpdateValidator from 'App/Validators/SkillUpdateValidator'

export default class SkillsController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('viewList')

    const skills = await Skill.all()

    return view.render('pages/skills/index', { skills })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('create')

    return view.render('pages/skills/create')
  }

  public async store({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('create')

    const data = await request.validate(SkillStoreValidator)

    const skill = await Skill.create(data)

    return response.redirect().toRoute('SkillsController.show', { id: skill.id })
  }

  public async show({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('view')

    const skill = await Skill.findOrFail(params.id)

    return view.render('pages/skills/show', { skill })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('update')

    const skill = await Skill.findOrFail(params.id)

    return view.render('pages/skills/edit', { skill })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('update')

    const skill = await Skill.findOrFail(params.id)

    const data = await request.validate(SkillUpdateValidator)

    skill.merge(data)

    await skill.save()

    return response.redirect().toRoute('SkillsController.show', { id: skill.id })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('SkillPolicy').authorize('delete')

    const skill = await Skill.findOrFail(params.id)

    await skill.delete()

    return response.redirect().toRoute('SkillsController.index')
  }
}
