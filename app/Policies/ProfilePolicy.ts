import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class ProfilePolicy extends BasePolicy {
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
  public async update(userAuthenticated: User, user: User) {
    return userAuthenticated.id === user.id
  }
  public async delete(userAuthenticated: User, user: User) {
    return userAuthenticated.id === user.id
  }
}
