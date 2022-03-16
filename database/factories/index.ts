import Factory from '@ioc:Adonis/Lucid/Factory'
import { ReasonType } from 'App/Enums/ReasonType'
import { ReportEntity } from 'App/Enums/ReportEntity'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import Association from 'App/Models/Association'
import FocusInterest from 'App/Models/FocusInterest'
import Profile from 'App/Models/Profile'
import Reason from 'App/Models/Reason'
import Report from 'App/Models/Report'
import Role from 'App/Models/Role'
import School from 'App/Models/School'
import Skill from 'App/Models/Skill'
import Subject from 'App/Models/Subject'
import Tag from 'App/Models/Tag'
import Thematic from 'App/Models/Thematic'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export const SchoolFactory = Factory.define(School, ({ faker }) => {
  return {
    name: faker.company.companyName(),
    hostname: faker.internet.domainName(),
    city: faker.address.city(),
    website: faker.internet.url(),
    overview: faker.lorem.paragraph(),
  }
})
  .relation('profiles', () => ProfileFactory)
  .relation('associations', () => AssociationFactory)
  .build()

export const RoleFactory = Factory.define(Role, ({ faker }) => {
  return {
    name: faker.lorem.words(),
  }
}).build()

export const SkillFactory = Factory.define(Skill, ({ faker }) => {
  return {
    name: faker.lorem.words(),
  }
}).build()

export const FocusInterestFactory = Factory.define(FocusInterest, ({ faker }) => {
  return {
    name: faker.lorem.words(),
  }
}).build()

export const SubjectFactory = Factory.define(Subject, ({ faker }) => {
  return {
    name: faker.lorem.words(),
  }
}).build()

export const ThematicFactory = Factory.define(Thematic, ({ faker }) => {
  return {
    name: faker.lorem.words(),
  }
}).build()

export const TagFactory = Factory.define(Tag, ({ faker }) => {
  return {
    name: faker.lorem.words(),
  }
}).build()

export const ReasonFactory = Factory.define(Reason, ({ faker }) => {
  return {
    name: faker.lorem.words(),
    type: ReasonType.Association,
  }
})
  .state('profile', (reason) => (reason.type = ReasonType.Profile))
  .state('association', (reason) => (reason.type = ReasonType.Association))
  .state('school', (reason) => (reason.type = ReasonType.School))
  .build()

export const AssociationFactory = Factory.define(Association, ({ faker }) => {
  return {
    name: faker.company.companyName(),
    overview: faker.lorem.paragraph(),
    website: faker.internet.url(),
    email: faker.internet.email(),
  }
})
  .relation('profiles', () => ProfileFactory)
  .relation('tags', () => TagFactory)
  .relation('thematic', () => ThematicFactory)
  .relation('school', () => SchoolFactory)
  .build()

export const ProfileFactory = Factory.define(Profile, ({ faker }) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    graduationYear: faker.datatype.number({ min: 2000, max: 2020 }),
    bio: faker.lorem.paragraph(4),
  }
})
  .relation('user', () => UserFactory)
  .relation('focusInterests', () => FocusInterestFactory)
  .relation('skills', () => SkillFactory)
  .relation('school', () => SchoolFactory)
  .relation('associations', () => AssociationFactory)
  .relation('role', () => RoleFactory)
  .build()

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: 'secret',
  }
})
  .state('admin', (user) => (user.role = UserRole.Admin))
  .state('active', (user) => (user.status = UserStatus.Active))
  .relation('profile', () => ProfileFactory)
  .build()

export const ReportFactory = Factory.define(Report, ({ faker }) => {
  return {
    description: faker.lorem.paragraph(),
    resolvedAt: null,
  }
})
  .relation('reporter', () => UserFactory)
  .relation('reason', () => ReasonFactory)
  .relation('profile', () => ProfileFactory)
  .relation('association', () => AssociationFactory)
  .relation('school', () => SchoolFactory)
  .relation('resolvedBy', () => UserFactory)
  .state('resolved', (report) => (report.resolvedAt = DateTime.local()))
  .state('profile', (report) => (report.entityType = ReportEntity.Profile))
  .state('association', (report) => (report.entityType = ReportEntity.Association))
  .state('school', (report) => (report.entityType = ReportEntity.School))
  .build()
