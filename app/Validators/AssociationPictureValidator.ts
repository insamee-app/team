import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AssociationPictureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    picture: schema.file({
      size: '200kb',
      extnames: ['jpg', 'gif', 'png'],
    }),
  })

  public messages = {
    'picture.file': 'Une image doit être sélectionnée',
    'picture.size': "L'image doit être inférieure à 200kb",
    'picture.extnames': "L'image doit être au format jpg, gif ou png",
  }
}
