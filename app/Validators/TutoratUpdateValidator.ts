import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TutoratType } from 'App/Enums/TutoratType'
import { TutoratKind } from 'App/Enums/TutoratKind'
import { TutoratStatus } from 'App/Enums/TutoratStatus'

export default class TutoratUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    description: schema.string({}, [rules.maxLength(2048)]),
    type: schema.enum.optional(Object.keys(TutoratType), [
      rules.requiredWhen('kind', '=', TutoratKind.Offer),
    ]),
    status: schema.enum.optional(Object.keys(TutoratStatus)),
    startDate: schema.date.optional(
      {
        format: 'yyyy-MM-dd',
      },
      [rules.requiredWhen('kind', '=', TutoratKind.Offer)]
    ),
    startTime: schema.date.optional(
      {
        format: 'HH:mm',
      },
      [rules.requiredWhen('kind', '=', TutoratKind.Offer)]
    ),
    endDate: schema.date.optional(
      {
        format: 'yyyy-MM-dd',
      },
      [rules.requiredWhen('kind', '=', TutoratKind.Offer)]
    ),
    endTime: schema.date.optional(
      {
        format: 'HH:mm',
      },
      [rules.requiredWhen('kind', '=', TutoratKind.Offer)]
    ),
    attendeeCapacity: schema.number.optional([rules.requiredWhen('kind', '=', TutoratKind.Offer)]),
    subjectId: schema.string.optional({}, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: 'subjects', column: 'id' }),
    ]),
  })

  public messages = {
    'description.required': 'Veuillez entrer une description',
    'description.maxLength': 'La description doit faire moins de 2048 caractères',
    'type.required': 'Veuillez sélectionner un type',
    'type.enum': 'Veuillez sélectionner un type valide',
    'status.enum': 'Veuillez sélectionner un statut valide',
    'startDate.date': 'Veuillez sélectionner une date de début valide',
    'startTime.date': 'Veuillez sélectionner une heure de début valide',
    'endDate.date': 'Veuillez sélectionner une date de fin valide',
    'endTime.date': 'Veuillez sélectionner une heure de fin valide',
    'attendeeCapacity.required': "Veuillez sélectionner une capacité d'inscription",
    'attendeeCapacity.number': "Veuillez sélectionner une capacité d'inscription valide",
    'subjectId.uuid': 'Veuillez sélectionner une matière valide',
    'subjectId.exists': 'Veuillez sélectionner une matière valide',
  }
}
