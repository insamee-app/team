import Factory from '@ioc:Adonis/Lucid/Factory'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import School from 'App/Models/School'
import User from 'App/Models/User'

export const SchoolFactory = Factory.define(School, ({ faker }) => {
  return {
    name: faker.company.companyName(),
    host: faker.internet.domainName(),
  }
}).build()

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: 'secret',
  }
})
  .state('admin', (user) => (user.role = UserRole.Admin))
  .state('active', (user) => (user.status = UserStatus.Active))
  .build()
