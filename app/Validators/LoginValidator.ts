import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserStatus } from 'App/Enums/UserStatus'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.exists({ table: 'users', column: 'email', where: { status: UserStatus.Active } }),
    ]),
    password: schema.string(),
  })

  public messages = {
    'email.required': "L'email est requis",
    'email.exists': "Cet email n'est pas vérifié",
    'password.required': 'Le mot de passe est requis',
  }
}
