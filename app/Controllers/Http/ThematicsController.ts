import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thematic from 'App/Models/Thematic'
import ThematicStoreValidator from 'App/Validators/ThematicStoreValidator'
import ThematicUpdateValidator from 'App/Validators/ThematicUpdateValidator'

export default class ThematicsController {
  public async index({ view, bouncer }: HttpContextContract) {}

  public async create({ view, bouncer }: HttpContextContract) {}

  public async store({ request, view, bouncer, response }: HttpContextContract) {}

  public async show({ view, bouncer, params }: HttpContextContract) {}

  public async edit({ view, bouncer, params }: HttpContextContract) {}

  public async update({ request, response, bouncer, params }: HttpContextContract) {}

  public async destroy({ response, bouncer, params }: HttpContextContract) {}
}
