import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SchoolValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(255)]),
    host: schema.string({ trim: true }, [
      rules.maxLength(48),
      rules.url(),
      rules.unique({
        table: 'schools',
        column: 'host',
      }),
    ]),
  })

  public messages = {
    'name.required': "Le nom de l'école est requis",
    'name.maxLength': "Le nom de l'école doit être inférieur à 255 caractères",
    'host.required': "Le domaine de l'école est requise",
    'host.maxLength': "Le domaine de l'école doit être inférieure à 48 caractères",
    'host.url': "Le domaine de l'école doit être une URL valide",
    'host.unique': "Le domaine de l'école doit être unique",
  }
}
