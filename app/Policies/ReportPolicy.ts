import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class ReportPolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.SuperAdmin) {
      return true
    }
  }

  public async viewList(user: User) {
    return user.role === UserRole.Moderator || user.role === UserRole.Admin
  }

  public async view(user: User) {
    return user.role === UserRole.Moderator || user.role === UserRole.Admin
  }

  public async create() {
    return false
  }

  public async update(user: User) {
    return user.role === UserRole.Moderator || user.role === UserRole.Admin
  }

  public async delete() {
    return false
  }
}
