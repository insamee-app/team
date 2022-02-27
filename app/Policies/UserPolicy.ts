import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.SuperAdmin) {
      return true
    }
  }

  public async viewList(user: User) {
    return user.role > UserRole.EventCreator
  }

  public async view(user: User) {
    return user.role > UserRole.EventCreator
  }

  public async create() {
    return false
  }

  public async update() {
    return false
  }

  public async delete(user: User, target: User) {
    return user.id === target.id
  }

  public async block(user: User) {
    return user.role === UserRole.Moderator
  }

  public async unblock(user: User) {
    return user.role === UserRole.Moderator
  }
}
