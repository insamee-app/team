import Factory from '@ioc:Adonis/Lucid/Factory'
import School from 'App/Models/School'

export const SchoolFactory = Factory.define(School, ({ faker }) => {
  return {
    name: faker.company.companyName(),
    host: faker.internet.domainName(),
  }
}).build()
