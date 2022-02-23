import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SchoolBannerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    banner: schema.file({
      size: '500kb',
      extnames: ['jpg', 'gif', 'png'],
    }),
  })

  public messages = {
    'banner.file': 'Une image doit être sélectionnée',
    'banner.size': "L'image doit être inférieure à 500kb",
    'banner.extnames': "L'image doit être au format jpg, gif ou png",
  }
}
