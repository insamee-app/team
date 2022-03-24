import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import Event from 'App/Models/Event'
import User from 'App/Models/User'

export default class EventPolicy extends BasePolicy {
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
      user.role === UserRole.EventsCreator ||
      user.role === UserRole.EventsManager ||
      user.role === UserRole.Admin ||
      user.role === UserRole.SuperEventsManager ||
      user.role === UserRole.SuperSupervisor
    )
  }

  public async update(user: User, event: Event) {
    return (
      user.id === event.creatorId ||
      ((user.role === UserRole.EventsManager ||
        user.role === UserRole.Supervisor ||
        user.role === UserRole.Admin) &&
        event.hostSchools.find((value) => value.id === user.profile.schoolId)) ||
      user.role === UserRole.SuperEventsManager ||
      user.role === UserRole.SuperSupervisor
    )
  }

  public async delete(user: User, event: Event) {
    return (
      user.id === event.creatorId ||
      ((user.role === UserRole.EventsManager ||
        user.role === UserRole.Supervisor ||
        user.role === UserRole.Admin) &&
        event.hostSchools.find((value) => value.id === user.profile.schoolId)) ||
      user.role === UserRole.SuperEventsManager ||
      user.role === UserRole.SuperSupervisor
    )
  }
}
