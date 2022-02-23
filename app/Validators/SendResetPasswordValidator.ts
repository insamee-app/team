import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserStatus } from 'App/Enums/UserStatus'

export default class SendResetPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.exists({ table: 'users', column: 'email', where: { status: UserStatus.Active } }),
    ]),
  })

  public messages = {
    'email.required': "L'email est requis",
    'email.email': "L'email n'est pas valide",
    'email.exists': "Cet email n'est pas vérifié",
  }
}
