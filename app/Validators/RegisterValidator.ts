import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }, [rules.maxLength(255)]),
    lastName: schema.string({ trim: true }, [rules.maxLength(255)]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
      rules.existsHostSchool(),
    ]),
    password: schema.string({}, [rules.confirmed(), rules.minLength(6)]),
  })

  public messages = {
    'firstName.required': 'Le prénom est requis',
    'firstName.maxLength': 'Le prénom ne doit pas dépasser 255 caractères',
    'lastName.required': 'Le nom est requis',
    'lastName.maxLength': 'Le nom ne doit pas dépasser 255 caractères',
    'email.required': "L'email est requis",
    'email.email': "L'email n'est pas valide",
    'email.unique': 'Cet email est déjà utilisé',
    'email.existsHostSchool': "Le domaine de l'email n'est pas valide",
    'password.required': 'Le mot de passe est requis',
    'password.minLength': 'Le mot de passe doit contenir au moins 6 caractères',
    'password_confirmation.confirmed': 'Les mots de passe ne correspondent pas',
  }
}
