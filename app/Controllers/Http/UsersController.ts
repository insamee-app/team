import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  private PER_PAGE = 10

  public async index({ view, bouncer, request }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('viewList')

    const page = request.input('page', 1)

    const users = await User.withBlocked().paginate(page, this.PER_PAGE)

    users.baseUrl(request.url())

    return view.render('pages/users/index', { users })
  }

  public async show({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('view')

    const user = await User.withBlocked()
      .where('id', params.id)
      .preload('profile', (profile) => {
        profile['ignoreBlocked'] = false
        profile.select('id')
      })
      .firstOrFail()

    return view.render('pages/users/show', { user })
  }

  public async block({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.block()

    session.flash('success', 'Utilisateur bloqué avec succès')
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async unblock({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.unblock()

    session.flash('success', 'Utilisateur débloqué avec succès')
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeModerator({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.makeModerator()

    session.flash('success', 'Utilisateur promu au role de modérateur')
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async makeAdmin({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.makeAdmin()

    session.flash('success', "Utilisateur promu au role d'administrateur")
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async removeModerator({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.makeMember()

    session.flash('success', 'Utilisateur rétrogradé au role de membre')
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async removeAdmin({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.makeMember()

    session.flash('success', 'Utilisateur rétrogradé au role de membre')
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }
}
