import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SchoolFactory } from 'Database/factories'

export default class SchoolSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await SchoolFactory.with('associations', 15, (association) =>
      association
        .with('thematic', 1)
        .with('tags', 5)
        .with('profiles', 10, (profile) => profile.with('user', 1).with('school', 1))
    )
      .with('profiles', 30, (profile) =>
        profile.with('user', 1).with('focusInterests', 2).with('skills', 2)
      )
      .createMany(7)
  }
}
