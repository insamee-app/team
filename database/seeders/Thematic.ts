import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ThematicFactory } from 'Database/factories'

export default class ThematicSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await ThematicFactory.createMany(15)
  }
}
