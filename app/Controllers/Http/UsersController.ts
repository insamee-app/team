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

  public async destroy({ response, params, bouncer, session }: HttpContextContract) {
    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await bouncer.with('UserPolicy').authorize('delete', user)

    const profile = await user.related('profile').query().firstOrFail()

    await profile.delete()
    await user.delete()

    session.flash('success', 'Compte supprimé avec succès')
    return response.redirect().toRoute('home')
  }

  public async block({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('block')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.block()

    session.flash('success', 'Utilisateur bloqué avec succès')
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }

  public async unblock({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('unblock')

    const user = await User.withBlocked().where('id', params.id).firstOrFail()

    await user.unblock()

    session.flash('success', 'Utilisateur débloqué avec succès')
    return response.redirect().toRoute('UsersController.show', { id: user.id })
  }
}
