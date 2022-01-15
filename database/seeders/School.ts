import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SchoolFactory } from 'Database/factories'

export default class SchoolSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await SchoolFactory.createMany(7)
  }
}
