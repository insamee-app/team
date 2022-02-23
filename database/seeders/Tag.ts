import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TagFactory } from 'Database/factories'

export default class TagSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await TagFactory.createMany(15)
  }
}
