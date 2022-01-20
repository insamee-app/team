import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }),
    lastName: schema.string({ trim: true }),
    graduationYear: schema.number.optional(),
    skills: schema.array
      .optional([rules.maxLength(10)])
      .members(schema.string({}, [rules.exists({ table: 'skills', column: 'id' })])),
    focusInterests: schema.array
      .optional([rules.maxLength(10)])
      .members(schema.string({}, [rules.exists({ table: 'focus_interests', column: 'id' })])),
  })

  public messages = {
    'firstName.required': 'Un prénom est requis',
    'lastName.required': 'Un nom est requis',
    'graduationYear.required': 'Un année de graduation est requise',
    'skills.maxLength': 'Vous ne pouvez pas ajouter plus de 10 compétences',
    'skills.*.string': 'Une compétence doit être une chaîne de caractères',
    'skills.*.exists': "Une compétence n'existe pas",
    'focusInterests.maxLength': "Vous ne pouvez pas ajouter plus de 10 centres d'intérêts",
    'focusInterests.*.string': "Un centre d'intérêt doit être une chaîne de caractères",
    'focusInterests.*.exists': "Un centre d'intérêt n'existe pas",
  }
}
