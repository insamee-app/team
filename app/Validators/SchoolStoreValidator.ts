import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SchoolStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.unique({
        table: 'schools',
        column: 'name',
      }),
    ]),
    hostname: schema.string({ trim: true }, [
      rules.maxLength(48),
      rules.url(),
      rules.unique({
        table: 'schools',
        column: 'hostname',
      }),
    ]),
    city: schema.string({ trim: true }, [rules.maxLength(255)]),
    website: schema.string.optional({ trim: true }, [rules.url()]),
    overview: schema.string.optional({ trim: true }, [rules.maxLength(2048)]),
  })

  public messages = {
    'name.required': "Le nom de l'école est requis",
    'name.maxLength': "Le nom de l'école doit être inférieur à 255 caractères",
    'name.unique': 'Cette école existe déjà',
    'hostname.required': "Le domaine de l'école est requise",
    'hostname.maxLength': "Le domaine de l'école doit être inférieure à 48 caractères",
    'hostname.url': "Le domaine de l'école doit être une URL valide",
    'hostname.unique': "Le domaine de l'école doit être unique",
    'city.maxLength': "La ville de l'école doit être inférieure à 255 caractères",
    'website.url': "Le site web de l'école doit être une URL valide",
    'overview.maxLength': "La présentation de l'école doit être inférieure à 2048 caractères",
  }
}
