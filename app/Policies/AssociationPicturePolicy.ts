import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import { UserRole } from 'App/Enums/UserRole'
import Association from 'App/Models/Association'
import User from 'App/Models/User'

export default class AssociationPicturePolicy extends BasePolicy {
  public async before(user: User) {
    if (user.blockedAt) return false

    if (user.role === UserRole.SuperAdmin) {
      return true
    }
  }

  public async update(user: User, association: Association) {
    await user.load('profile')

    return (
      ((user.role === UserRole.AssociativeManager ||
        user.role === UserRole.Supervisor ||
        user.role === UserRole.Admin) &&
        user.profile.schoolId === association.schoolId) ||
      user.role === UserRole.SuperAssociativeManager ||
      user.role === UserRole.SuperSupervisor
    )
  }

  public async delete(user: User, association: Association) {
    await user.load('profile')

    return (
      ((user.role === UserRole.AssociativeManager ||
        user.role === UserRole.Supervisor ||
        user.role === UserRole.Admin) &&
        user.profile.schoolId === association.schoolId) ||
      user.role === UserRole.SuperAssociativeManager ||
      user.role === UserRole.SuperSupervisor
    )
  }
}
