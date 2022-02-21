import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ReasonType } from 'App/Enums/ReasonType'

export default class ReasonStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255),
      rules.unique({
        table: 'reasons',
        column: 'name',
        where: {
          type: this.ctx.request.input('type'),
        },
      }),
    ]),
    type: schema.enum(Object.keys(ReasonType)),
  })

  public messages = {
    'name.required': 'Le nom est requis',
    'name.maxLength': 'Le nom ne doit pas dépasser 255 caractères',
    'name.unique': 'Le nom doit être unique pour ce type',
    'type.required': 'Le type est requis',
    'type.enum': "Le type n'a pas été reconnu",
  }
}
