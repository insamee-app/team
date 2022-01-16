import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    await User.create({
      email: 'admin@team.fr',
      password: 'secret',
      status: UserStatus.Active,
      role: UserRole.Admin,
    })

    await UserFactory.createMany(10)
    await UserFactory.apply('active')
      .with('profile', 1, (profile) => profile.with('school', 1))
      .createMany(20)
  }
}
