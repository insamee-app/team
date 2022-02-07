import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class ReportProfilePolicy extends BasePolicy {
  public async before(user: User) {
    if (user.role === UserRole.Admin) {
      return true
    }
  }

  public async create() {
    return true
  }

  public async update() {
    return false
  }
}
