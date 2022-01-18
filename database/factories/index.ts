import Factory from '@ioc:Adonis/Lucid/Factory'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import FocusInterest from 'App/Models/FocusInterest'
import Profile from 'App/Models/Profile'
import School from 'App/Models/School'
import Skill from 'App/Models/Skill'
import User from 'App/Models/User'

export const SchoolFactory = Factory.define(School, ({ faker }) => {
  return {
    name: faker.company.companyName(),
    host: faker.internet.domainName(),
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

export const ProfileFactory = Factory.define(Profile, ({ faker }) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    graduationYear: faker.datatype.number({ min: 2000, max: 2020 }),
  }
})
  .relation('school', () => SchoolFactory)
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
