import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EventType } from 'App/Enums/EventType'

export default class EventUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.maxLength(255)]),
    type: schema.enum(Object.keys(EventType)),
    location: schema.string.optional({ trim: true }, [
      rules.requiredWhen('type', '=', String(EventType.InPerson)),
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
    ticketsUrl: schema.string.optional({ trim: true }, [rules.url()]),
    url: schema.string.optional({ trim: true }, [rules.url()]),
    organizerAssociationId: schema.string.optional({}, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: 'associations', column: 'id' }),
    ]),
    organizerSchoolId: schema.string.optional({}, [
      rules.uuid({ version: 4 }),
      rules.exists({ table: 'schools', column: 'id' }),
    ]),
    description: schema.string({ trim: true }, [rules.maxLength(2048)]),
  })

  public messages = {
    'name.required': 'Le nom est requis',
    'name.maxLength': 'Le nom ne doit pas dépasser 255 caractères',
    'type.required': 'Le type est requis',
    'type.enum': 'Le type doit être valide',
    'location.requiredWhen': "La localisation est requise lorsque l'évènement est en présence",
    'startDate.required': 'La date de début est requise',
    'startDate.date': 'La date de début doit être une date valide',
    'startTime.required': "L'heure de début est requise",
    'startTime.date': "L'heure de début doit être une heure valide",
    'endDate.required': 'La date de fin est requise',
    'endDate.date': 'La date de fin doit être une date valide',
    'endTime.required': "L'heure de fin est requise",
    'endTime.date': "L'heure de fin doit être une heure valide",
    'ticketsUrl.url': "L'URL des billets doit être une URL valide",
    'url.url': "L'URL doit être une URL valide",
    'organizerAssociationId.uuid': "L'association organisatrice doit être valide",
    'organizerAssociationId.exists': "L'association organisatrice doit être valide",
    'organizerSchoolId.uuid': "L'école organisatrice doit être valide",
    'organizerSchoolId.exists': "L'école organisatrice doit être valide",
    'description.required': 'La description est requise',
    'description.maxLength': 'La description doit faire moins de 2048 caractères',
  }
}
