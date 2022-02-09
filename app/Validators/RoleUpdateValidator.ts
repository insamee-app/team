import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.unique({
        table: 'roles',
        column: 'name',
        whereNot: { id: this.ctx.params.id },
      }),
    ]),
  })

  public messages = {
    'name.required': 'Le nom du rôle est requis',
    'name.maxLength': 'Le nom du rôle doit être inférieur à 255 caractères',
    'name.unique': 'Le nom existe déjà',
  }
}
