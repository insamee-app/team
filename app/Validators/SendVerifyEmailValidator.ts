import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SendVerifyEmailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.exists({ table: 'users', column: 'email' }),
    ]),
  })

  public messages = {
    'email.required': "L'email est requis",
    'email.email': "L'email n'est pas valide",
    'email.exists': "Cet email n'existe pas",
  }
}
