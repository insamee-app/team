import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EventFactory } from 'Database/factories'

export default class EventSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await EventFactory.with('creator', 1, (creator) =>
      creator.with('profile', 1, (profile) => profile.with('school', 1))
    )
      .with('hostSchools', 2)
      .createMany(10)
    await EventFactory.with('creator', 1, (creator) =>
      creator.with('profile', 1, (profile) => profile.with('school', 1))
    )
      .with('organizingAssociations', 2, (association) =>
        association.with('school', 1).with('thematic', 1)
      )
      .apply('online')
      .createMany(10)

    await EventFactory.with('creator', 1, (creator) =>
      creator.with('profile', 1, (profile) => profile.with('school', 1))
    )
      .with('organizingAssociations', 2, (association) =>
        association.with('school', 1).with('thematic', 1)
      )
      .createMany(10)
    await EventFactory.with('creator', 1, (creator) =>
      creator.with('profile', 1, (profile) => profile.with('school', 1))
    )
      .with('organizingAssociations', 2, (association) =>
        association.with('school', 1).with('thematic', 1)
      )
      .apply('cancelled')
      .createMany(10)
  }
}
