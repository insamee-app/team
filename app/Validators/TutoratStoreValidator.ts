import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TutoratKind } from 'App/Enums/TutoratKind'
import { TutoratType } from 'App/Enums/TutoratType'

export default class TutoratStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    description: schema.string({}, [rules.maxLength(2048)]),
    kind: schema.enum(Object.keys(TutoratKind)),
    type: schema.enum.optional(Object.keys(TutoratType), [
      rules.requiredWhen('kind', '=', TutoratKind.Offer),
    ]),
    startDate: schema.date({
      format: 'yyyy-MM-dd',
    }),
    startTime: schema.date({
      format: 'HH:mm',
    }),
    endDate: schema.date({
      format: 'yyyy-MM-dd',
    }),
    endTime: schema.date({
      format: 'HH:mm',
    }),
    attendeeCapacity: schema.number.optional([rules.requiredWhen('kind', '=', TutoratKind.Offer)]),
    subjectId: schema.string.optional({}, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: 'subjects', column: 'id' }),
    ]),
    schoolId: schema.string({}, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: 'schools', column: 'id' }),
    ]),
  })

  public messages = {
    'description.required': 'La description est obligatoire',
    'description.maxLength': 'La description doit faire moins de 2048 caractères',
    'kind.required': 'Veuillez sélectionner un type de tutorat',
    'kind.enum': 'Veuillez sélectionner un type de tutorat valide',
    'type.required': 'Veuillez sélectionner un type',
    'type.enum': 'Veuillez sélectionner un type valide',
    'startDate.required': 'Veuillez sélectionner une date de début',
    'startDate.date': 'Veuillez sélectionner une date de début valide',
    'startTime.required': 'Veuillez sélectionner une heure de début',
    'startTime.date': 'Veuillez sélectionner une heure de début valide',
    'endDate.required': 'Veuillez sélectionner une date de fin',
    'endDate.date': 'Veuillez sélectionner une date de fin valide',
    'endTime.required': 'Veuillez sélectionner une heure de fin',
    'endTime.date': 'Veuillez sélectionner une heure de fin valide',
    'attendeeCapacity.required': "Veuillez sélectionner une capacité d'inscription",
    'attendeeCapacity.number': "Veuillez sélectionner une capacité d'inscription valide",
    'subjectId.uuid': 'Veuillez sélectionner une matière valide',
    'subjectId.exists': 'Veuillez sélectionner une matière valide',
    'schoolId.required': 'Veuillez sélectionner une école',
    'schoolId.uuid': 'Veuillez sélectionner une école valide',
    'schoolId.exists': 'Veuillez sélectionner une école valide',
  }
}
