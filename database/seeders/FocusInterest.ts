import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { FocusInterestFactory } from 'Database/factories'

export default class FocusInterestSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await FocusInterestFactory.createMany(15)
  }
}
