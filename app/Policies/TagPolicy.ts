import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class TagPolicy extends BasePolicy {
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
    return (
      user.role === UserRole.AssociativeManager ||
      user.role === UserRole.Supervisor ||
      user.role === UserRole.SuperAssociativeManager ||
      user.role === UserRole.SuperSupervisor ||
      user.role === UserRole.Admin
    )
  }

  public async update(user: User) {
    return (
      user.role === UserRole.AssociativeManager ||
      user.role === UserRole.Supervisor ||
      user.role === UserRole.SuperAssociativeManager ||
      user.role === UserRole.SuperSupervisor ||
      user.role === UserRole.Admin
    )
  }

  public async delete(user: User) {
    return (
      user.role === UserRole.AssociativeManager ||
      user.role === UserRole.Supervisor ||
      user.role === UserRole.SuperAssociativeManager ||
      user.role === UserRole.SuperSupervisor ||
      user.role === UserRole.Admin
    )
  }
}
