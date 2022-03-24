import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EventImageValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    image: schema.file({
      size: '800kb',
      extnames: ['jpg', 'gif', 'png'],
    }),
  })

  public messages = {
    'image.file': 'Une image doit être sélectionnée',
    'image.size': "L'image doit être inférieure à 800kb",
    'image.extnames': "L'image doit être au format jpg, gif ou png",
  }
}
