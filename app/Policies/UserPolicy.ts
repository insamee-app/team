import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.Admin) {
      return true
    }
  }

  public async viewList() {
    return false
  }

  public async view() {
    return false
  }

  public async create() {
    return false
  }

  public async update() {
    return false
  }

  public async delete() {
    return false
  }
}
