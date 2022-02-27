import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'

export default class UserRolePolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.SuperAdmin) {
      return true
    }
  }

  public async makeMember(user: User, target: User) {
    return user.role > target.role
  }

  public async makeEventCreator(user: User, target: User) {
    await user.load('profile')
    await target.load('profile')

    return (
      (user.role === UserRole.EventManager ||
        user.role === UserRole.AssociativeManager ||
        user.role === UserRole.Supervisor ||
        user.role === UserRole.Admin) &&
      user.profile.schoolId === target.profile.schoolId
    )
  }

  public async makeEventManager(user: User, target: User) {
    await user.load('profile')
    await target.load('profile')

    return (
      (user.role === UserRole.Admin && user.profile.schoolId === target.profile.schoolId) ||
      user.role === UserRole.SuperSupervisor
    )
  }

  public async makeAssociativeManager(user: User, target: User) {
    await user.load('profile')
    await target.load('profile')

    return (
      (user.role === UserRole.Admin && user.profile.schoolId === target.profile.schoolId) ||
      user.role === UserRole.SuperSupervisor
    )
  }

  public async makeSupervisor(user: User, target: User) {
    await user.load('profile')
    await target.load('profile')

    return (
      (user.role === UserRole.Admin && user.profile.schoolId === target.profile.schoolId) ||
      user.role === UserRole.SuperSupervisor
    )
  }

  public async makeSuperEventManager(user: User) {
    return user.role === UserRole.SuperSupervisor
  }

  public async makeSuperAssociativeManager(user: User) {
    return user.role === UserRole.SuperSupervisor
  }

  public async makeSuperSupervisor() {
    return false
  }

  public async makeModerator(user: User, target: User) {
    await user.load('profile')
    await target.load('profile')

    return user.role === UserRole.Admin && user.profile.schoolId === target.profile.schoolId
  }

  public async makeAdmin(user: User, target: User) {
    await user.load('profile')
    await target.load('profile')

    return user.role === UserRole.Admin && user.profile.schoolId === target.profile.schoolId
  }

  public async makeSuperAdmin() {
    return false
  }
}
