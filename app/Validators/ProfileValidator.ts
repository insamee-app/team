import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }),
    lastName: schema.string({ trim: true }),
    graduationYear: schema.number.optional(),
    skills: schema.array
      .optional()
      .members(schema.string({}, [rules.exists({ table: 'skills', column: 'id' })])),
  })

  public messages = {
    'firstName.required': 'Un prénom est requis',
    'lastName.required': 'Un nom est requis',
    'graduationYear.required': 'Un année de graduation est requise',
    'skills.*.string': 'Une compétence doit être une chaîne de caractères',
    'skills.*.exists': "Une compétence n'existe pas",
  }
}
