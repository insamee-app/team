import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ReportProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    reasonId: schema.string({}, [rules.uuid({ version: 4 })]),
    description: schema.string.optional({}, [rules.maxLength(1024)]),
  })

  public messages = {
    'reasonId.required': 'Veuillez sélectionner une raison',
    'reasonId.uuid': 'Veuillez sélectionner une raison valide',
    'description.maxLength': 'La description doit faire moins de 1024 caractères',
  }
}
