import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileAvatarValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    avatar: schema.file({
      size: '200kb',
      extnames: ['jpg', 'gif', 'png'],
    }),
  })

  public messages = {
    'avatar.file': 'Une image doit être sélectionnée',
    'avatar.size': "L'image doit être inférieure à 200kb",
    'avatar.extnames': "L'image doit être au format jpg, gif ou png",
  }
}
