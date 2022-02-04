import Factory from '@ioc:Adonis/Lucid/Factory'
import { UserStatus } from 'App/Enums/UserStatus'
import { UserRole } from 'App/Enums/UserRole'
import FocusInterest from 'App/Models/FocusInterest'
import Association from 'App/Models/Association'
import Thematic from 'App/Models/Thematic'
import Profile from 'App/Models/Profile'
import School from 'App/Models/School'
import Skill from 'App/Models/Skill'
import User from 'App/Models/User'
import Tag from 'App/Models/Tag'
import Reason from 'App/Models/Reason'

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
  }
}).build()

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
  }
})
  .relation('user', () => UserFactory)
  .relation('focusInterests', () => FocusInterestFactory)
  .relation('skills', () => SkillFactory)
  .relation('school', () => SchoolFactory)
  .relation('associations', () => AssociationFactory)
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
