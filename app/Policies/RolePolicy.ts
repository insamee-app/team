import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class RolePolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.SuperAdmin) {
      return true
    }
  }

  public async viewList() {
    return false
  }

  public async view() {
    return false
  }

  public async create(user: User) {
    return user.role === UserRole.SuperSupervisor || user.role === UserRole.Admin
  }

  public async update(user: User) {
    return user.role === UserRole.SuperSupervisor || user.role === UserRole.Admin
  }

  public async delete(user: User) {
    return user.role === UserRole.SuperSupervisor || user.role === UserRole.Admin
  }
}
