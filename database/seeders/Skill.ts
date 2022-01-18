import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SkillFactory } from 'Database/factories'

export default class SkillSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await SkillFactory.createMany(15)
  }
}
