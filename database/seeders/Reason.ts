import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ReasonFactory } from 'Database/factories'

export default class ReasonSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await ReasonFactory.createMany(15)
  }
}
