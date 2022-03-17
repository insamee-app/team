import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TutoratFactory } from 'Database/factories'

export default class TutoratSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await TutoratFactory.with('subject', 1).with('school', 1).with('creator', 1).createMany(15)
  }
}
