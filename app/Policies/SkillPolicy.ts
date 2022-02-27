import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import { UserRole } from 'App/Enums/UserRole'

export default class SkillPolicy extends BasePolicy {
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
