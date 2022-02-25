import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EventFactory } from 'Database/factories'

export default class EventSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await EventFactory.with('creator', 1).with('organizerSchool', 1).createMany(10)
    await EventFactory.with('creator', 1).with('organizerSchool', 1).apply('online').createMany(10)

    await EventFactory.with('creator', 1)
      .with('organizerAssociation', 1, (association) =>
        association.with('school', 1).with('thematic', 1)
      )
      .createMany(10)
    await EventFactory.with('creator', 1)
      .with('organizerAssociation', 1, (association) =>
        association.with('school', 1).with('thematic', 1)
      )
      .apply('cancelled')
      .createMany(10)
  }
}
