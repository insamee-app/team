import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { AssociationFactory } from 'Database/factories'

export default class AssociationSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await AssociationFactory.with('school').createMany(15)
  }
}
