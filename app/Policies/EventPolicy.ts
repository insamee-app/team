import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class EventPolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.Admin) {
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
    return true
  }

  public async update() {
    return true
  }

  public async delete() {
    return true
  }
}
