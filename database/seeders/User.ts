import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import Role from 'App/Models/Role'
import School from 'App/Models/School'
import User from 'App/Models/User'
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
      hostname: 'team.fr',
      city: 'Paris',
      website: 'https://team.fr',
    })
    const role = await Role.create({
      name: 'étudiant',
    })

    await user.related('profile').create({
      firstName: 'Admin',
      lastName: 'Team',
      graduationYear: 2020,
      roleId: role.id,
      schoolId: school.id,
      userId: user.id,
    })
  }
}
