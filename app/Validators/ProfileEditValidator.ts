import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileEditValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }),
    lastName: schema.string({ trim: true }),
    graduationYear: schema.number.optional(),
  })

  public messages = {
    'firstName.required': 'Un prénom est requis',
    'lastName.required': 'Un nom est requis',
  }
}
