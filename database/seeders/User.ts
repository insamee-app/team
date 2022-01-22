import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import School from 'App/Models/School'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run() {
    const user = await User.create({
      email: 'admin@team.fr',
      password: 'secret',
      status: UserStatus.Active,
      role: UserRole.Admin,
    })
    const school = await School.create({
      name: 'Team',
      host: 'team.fr',
    })
    await user.related('profile').create({
      firstName: 'Admin',
      lastName: 'Team',
      graduationYear: 2020,
      schoolId: school.id,
      userId: user.id,
    })
  }
}
