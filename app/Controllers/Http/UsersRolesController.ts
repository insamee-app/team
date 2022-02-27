import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersRolesController {
  public async makeMember({ response, params, bouncer, session }: HttpContextContract) {
    const user = await User.withBlocked().where('id', params.id).firstOrFail()
    await bouncer.with('UserRolePolicy').authorize('makeMember', user)

    await user.makeMember()

    session.flash('success', "Role de membre donné à l'utilisateur")

    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeEventsCreator({ response, params, bouncer, session }: HttpContextContract) {
    const user = await User.withBlocked().where('id', params.id).firstOrFail()
    await bouncer.with('UserRolePolicy').authorize('makeEventsCreator', user)

    await user.makeEventsCreator()

    session.flash('success', "Role de créateur d'évènement donné à l'utilisateur")

    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeEventsManager({ response, params, bouncer, session }: HttpContextContract) {
    const user = await User.withBlocked().where('id', params.id).firstOrFail()
    await bouncer.with('UserRolePolicy').authorize('makeEventsCreator', user)

    await user.makeEventsManager()

    session.flash('success', "Role de gestionnaire d'évènement donné à l'utilisateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeSuperEventsManager({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserRolePolicy').authorize('makeSuperEventsManager')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.makeSuperEventsManager()

    session.flash('success', "Role de super gestionnaire d'évènement donné à l'utilisateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeAssociativeManager({ response, params, bouncer, session }: HttpContextContract) {
    const user = await User.withBlocked().where('id', params.id).firstOrFail()
    await bouncer.with('UserRolePolicy').authorize('makeAssociativeManager', user)

    await user.makeAssociativeManager()

    session.flash('success', "Role de gestionnaire d'association donné à l'utilisateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeSuperAssociativeManager({
    response,
    params,
    bouncer,
    session,
  }: HttpContextContract) {
    await bouncer.with('UserRolePolicy').authorize('makeSuperAssociativeManager')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.makeSuperAssociativeManager()

    session.flash('success', "Role de super gestionnaire d'association donné à l'utilisateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeSupervisor({ response, params, bouncer, session }: HttpContextContract) {
    const user = await User.withBlocked().where('id', params.id).firstOrFail()
    await bouncer.with('UserRolePolicy').authorize('makeSupervisor', user)

    await user.makeSupervisor()

    session.flash('success', "Role de superviseur donné à l'utilisateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeSuperSupervisor({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserRolePolicy').authorize('makeSuperSupervisor')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.makeSuperSupervisor()

    session.flash('success', "Role de super superviseur donné à l'utilisateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeModerator({ response, params, bouncer, session }: HttpContextContract) {
    const user = await User.withBlocked().where('id', params.id).firstOrFail()
    await bouncer.with('UserRolePolicy').authorize('makeModerator', user)

    await user.makeModerator()

    session.flash('success', "Role de modérateur donné à l'utilisateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeAdmin({ response, params, bouncer, session }: HttpContextContract) {
    const user = await User.withBlocked().where('id', params.id).firstOrFail()
    await bouncer.with('UserRolePolicy').authorize('makeAdmin', user)

    await user.makeAdmin()

    session.flash('success', "Role d'administrateur donné à l'utilisateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeSuperAdmin({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserRolePolicy').authorize('makeSuperAdmin')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.makeSuperAdmin()

    session.flash('success', "Role de super administrateur donné à l'utilisateur")

    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }
}
