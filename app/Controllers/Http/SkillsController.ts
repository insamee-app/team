import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Skill from 'App/Models/Skill'
import SkillStoreValidator from 'App/Validators/SkillStoreValidator'
import SkillUpdateValidator from 'App/Validators/SkillUpdateValidator'

export default class SkillsController {
  public async index({ view }: HttpContextContract) {
    const skills = await Skill.all()

    return view.render('pages/skills/index', { skills })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/skills/create')
  }

  public async store({ response, request }: HttpContextContract) {
    const data = await request.validate(SkillStoreValidator)

    const skill = await Skill.create(data)

    return response.redirect().toRoute('SkillsController.show', { id: skill.id })
  }

  public async show({ view, params }: HttpContextContract) {
    const skill = await Skill.findOrFail(params.id)

    return view.render('pages/skills/show', { skill })
  }

  public async edit({ view, params }: HttpContextContract) {
    const skill = await Skill.findOrFail(params.id)

    return view.render('pages/skills/edit', { skill })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const skill = await Skill.findOrFail(params.id)

    const data = await request.validate(SkillUpdateValidator)

    skill.merge(data)

    await skill.save()

    return response.redirect().toRoute('SkillsController.show', { id: skill.id })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const skill = await Skill.findOrFail(params.id)

    await skill.delete()

    return response.redirect().toRoute('SkillsController.index')
  }
}
