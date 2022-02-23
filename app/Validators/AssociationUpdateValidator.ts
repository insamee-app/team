import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AssociationUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.unique({ table: 'associations', column: 'name', whereNot: { id: this.ctx.params.id } }),
    ]),
    overview: schema.string({ trim: true }, [rules.maxLength(2048)]),
    website: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.url()]),
    email: schema.string.optional({ trim: true }, [rules.maxLength(255), rules.email()]),
    thematicId: schema.string({ trim: true }, [rules.exists({ table: 'thematics', column: 'id' })]),
    tags: schema.array
      .optional([rules.maxLength(10)])
      .members(schema.string({}, [rules.exists({ table: 'tags', column: 'id' })])),
  })

  public messages = {
    'name.required': 'Le nom est requis',
    'name.maxLength': 'Le nom ne doit pas dépasser 255 caractères',
    'name.unique': 'Le nom doit être unique',
    'overview.required': 'La présentation est requis',
    'overview.maxLength': 'La présentation ne doit pas dépasser 2048 caractères',
    'website.maxLength': 'Le site web ne doit pas dépasser 255 caractères',
    'website.url': 'Le site web doit être une URL valide',
    'email.maxLength': "L'email ne doit pas dépasser 255 caractères",
    'email.email': "L'email doit être une adresse email valide",
    'thematicId.required': 'La thématique est requise',
    'thematicId.exists': "La thématique n'existe pas",
    'tags.maxLength': 'Vous ne pouvez pas ajouter plus de 10 tags',
    'tags.*.string': 'Un tag doit être une chaîne de caractères',
    'tags.*.exists': "Un tag n'existe pas",
  }
}
