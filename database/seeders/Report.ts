import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ReportFactory } from 'Database/factories'

export default class ReportSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    // With profiles
    await ReportFactory.with('reason', 1)
      .with('reporter', 1, (user) =>
        user.with('profile', 1, (profile) => profile.with('school', 1))
      )
      .with('profile', 1, (profile) => profile.with('user', 1).with('school', 1))
      .apply('profile')
      .createMany(1)

    // Without associations
    await ReportFactory.with('reporter', 1)
      .with('reason', 1)
      .with('association', 1, (association) =>
        association.with('thematic', 1).with('tags', 5).with('school', 1)
      )
      .apply('association')
      .createMany(6)

    // Without schools
    await ReportFactory.with('reporter', 1)
      .with('reason', 1)
      .with('school', 1)
      .apply('school')
      .createMany(6)
  }
}
