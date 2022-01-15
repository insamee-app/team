import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.existsHostSchool(),
    ]),
    password: schema.string({}, [rules.confirmed(), rules.minLength(6)]),
  })

  public messages = {
    'email.required': "L'email est requis",
    'email.email': "L'email n'est pas valide",
    'email.unique': 'Cet email est déjà utilisé',
    'email.existsHostSchool': "Le domaine de l'email n'est pas valide",
    'password.required': 'Le mot de passe est requis',
    'password.minLength': 'Le mot de passe doit contenir au moins 6 caractères',
    'password_confirmation.confirmed': 'Les mots de passe ne correspondent pas',
  }
}
