import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import Role from 'App/Models/Role'
import School from 'App/Models/School'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class AdminSeeder extends BaseSeeder {
  public async run() {
    const user = await User.firstOrCreate(
      { email: Env.get('ADMIN_EMAIL') },
      {
        email: Env.get('ADMIN_EMAIL'),
        password: Env.get('ADMIN_PASSWORD'),
        status: UserStatus.Active,
        role: UserRole.SuperAdmin,
      }
    )

    const school = await School.firstOrCreate(
      {
        name: Env.get('SCHOOL_NAME'),
      },
      {
        name: Env.get('SCHOOL_NAME'),
        hostname: Env.get('SCHOOL_HOSTNAME'),
        city: Env.get('SCHOOL_CITY'),
      }
    )

    const role = await Role.firstOrCreate(
      {
        name: Env.get('ADMIN_ROLE'),
      },
      {
        name: Env.get('ADMIN_ROLE'),
      }
    )

    await user.related('profile').firstOrCreate(
      {
        userId: user.id,
      },
      {
        firstName: Env.get('ADMIN_FIRST_NAME'),
        lastName: Env.get('ADMIN_LAST_NAME'),
        roleId: role.id,
        schoolId: school.id,
        userId: user.id,
      }
    )
  }
}
