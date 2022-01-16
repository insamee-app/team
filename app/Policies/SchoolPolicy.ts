import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import { UserRole } from 'App/Enums/UserRole'

export default class SchoolPolicy extends BasePolicy {
  public async before(user: User) {
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
    return false
  }

  public async update() {
    return false
  }

  public async delete() {
    return false
  }
}