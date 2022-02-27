import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class ProfileAvatarPolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.SuperAdmin) {
      return true
    }
  }

  public async update(user: User, profile: Profile) {
    return (
      user.role === UserRole.Moderator || user.role === UserRole.Admin || user.id === profile.userId
    )
  }

  public async delete(user: User, profile: Profile) {
    return (
      user.role === UserRole.Moderator || user.role === UserRole.Admin || user.id === profile.userId
    )
  }
}
