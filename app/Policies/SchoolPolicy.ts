import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import { UserRole } from 'App/Enums/UserRole'
import School from 'App/Models/School'

export default class SchoolPolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.SuperAdmin) {
      return true
    }
  }

  public async viewList() {
    return true
  }

  public async view() {
    return true
  }

  public async create() {
    return false
  }

  public async update(user: User, school: School) {
    await user.load('profile')

    return user.role === UserRole.Admin && user.profile.schoolId === school.id
  }

  public async delete() {
    return false
  }
}
