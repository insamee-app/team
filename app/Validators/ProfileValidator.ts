import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfileValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({ trim: true }),
    lastName: schema.string({ trim: true }),
    graduationYear: schema.number.optional(),
    bio: schema.string.optional({ trim: true }, [rules.maxLength(2048)]),
    roleId: schema.string.optional({}, [
      rules.uuid(),
      rules.exists({ table: 'roles', column: 'id' }),
    ]),
    skills: schema.array
      .optional([rules.maxLength(10)])
      .members(schema.string({}, [rules.uuid(), rules.exists({ table: 'skills', column: 'id' })])),
    focusInterests: schema.array
      .optional([rules.maxLength(10)])
      .members(
        schema.string({}, [rules.uuid(), rules.exists({ table: 'focus_interests', column: 'id' })])
      ),
    preferredSubjects: schema.array
      .optional([rules.maxLength(10)])
      .members(
        schema.string({}, [rules.uuid(), rules.exists({ table: 'subjects', column: 'id' })])
      ),
    associations: schema.array
      .optional([rules.maxLength(10)])
      .members(
        schema.string({}, [rules.uuid(), rules.exists({ table: 'associations', column: 'id' })])
      ),
    facebookUrl: schema.string.nullableAndOptional({ trim: true }, [
      rules.url({
        allowedHosts: ['facebook.com', 'www.facebook.com'],
      }),
    ]),
    instagramUrl: schema.string.nullableAndOptional({ trim: true }, [
      rules.url({ allowedHosts: ['instagram.com', 'www.instagram.com'] }),
    ]),
    twitterUrl: schema.string.nullableAndOptional({ trim: true }, [
      rules.url({ allowedHosts: ['twitter.com', 'www.twitter.com'] }),
    ]),
    linkedinUrl: schema.string.nullableAndOptional({ trim: true }, [
      rules.url({
        allowedHosts: ['linkedin.com', 'www.linkedin.com'],
      }),
    ]),
  })

  public messages = {
    'firstName.required': 'Un prénom est requis',
    'lastName.required': 'Un nom est requis',
    'graduationYear.required': 'Un année de graduation est requise',
    'skills.maxLength': 'Vous ne pouvez pas ajouter plus de 10 compétences',
    'skills.*.string': 'Une compétence doit être une chaîne de caractères',
    'skills.*.uuid': 'Une compétence doit être un identifiant unique',
    'skills.*.exists': "Une compétence n'existe pas",
    'focusInterests.maxLength': "Vous ne pouvez pas ajouter plus de 10 centres d'intérêts",
    'focusInterests.*.string': "Un centre d'intérêt doit être une chaîne de caractères",
    'focusInterests.*.uuid': "Un centre d'intérêt doit être un identifiant unique",
    'focusInterests.*.exists': "Un centre d'intérêt n'existe pas",
    'preferredSubjects.maxLength': 'Vous ne pouvez pas ajouter plus de 10 matières préférées',
    'preferredSubjects.*.string': 'Une matière préférée doit être une chaîne de caractères',
    'preferredSubjects.*.uuid': 'Une matière préférée doit être un identifiant unique',
    'preferredSubjects.*.exists': "Une matière préférée n'existe pas",
    'associations.maxLength': 'Vous ne pouvez pas ajouter plus de 10 associations',
    'associations.*.string': 'Une association doit être une chaîne de caractères',
    'associations.*.uuid': 'Une association doit être un identifiant unique',
    'associations.*.exists': "Une association n'existe pas",
    'facebookUrl.url': 'Lien Facebook invalide',
    'facebookUrl.url.allowedHosts': 'Lien Facebook invalide',
    'instagramUrl.url': 'Lien Instagram invalide',
    'instagramUrl.url.allowedHosts': 'Lien Instagram invalide',
    'twitterUrl.url': 'Lien Twitter invalide',
    'twitterUrl.url.allowedHosts': 'Lien Twitter invalide',
    'linkedinUrl.url': 'Lien LinkedIn invalide',
    'linkedinUrl.url.allowedHosts': 'Lien LinkedIn invalide',
  }
}
