import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import Tutorat from 'App/Models/Tutorat'
import User from 'App/Models/User'

export default class TutoratPolicy extends BasePolicy {
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

  public async create() {
    return true
  }

  public async update(user: User, tutorat: Tutorat) {
    return user.id === tutorat.creatorId || user.role === UserRole.Moderator
  }

  public async delete(user: User, tutorat: Tutorat) {
    return user.id === tutorat.creatorId || user.role === UserRole.Moderator
  }
}
