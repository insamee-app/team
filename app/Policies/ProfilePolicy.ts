import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class ProfilePolicy extends BasePolicy {
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
  public async update(user: User, profile: Profile) {
    return user.id === profile.userId
  }
  public async delete(user: User, profile: Profile) {
    return user.id === profile.userId
  }
}
