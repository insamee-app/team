import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleStoreValidator from 'App/Validators/RoleStoreValidator'
import RoleUpdateValidator from 'App/Validators/RoleUpdateValidator'

export default class RolesController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('viewList')

    const roles = await Role.query().orderBy('name', 'asc')

    return view.render('pages/roles/index', { roles })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('create')

    return view.render('pages/roles/create')
  }

  public async store({ response, request, bouncer, session }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('create')

    const data = await request.validate(RoleStoreValidator)

    const role = await Role.create(data)

    session.flash('success', 'Role créé avec succès')
    return response.redirect().toRoute('RolesController.show', { id: role.id })
  }

  public async show({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')

    const role = await Role.findOrFail(params.id)

    return view.render('pages/roles/show', { role })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('update')

    const role = await Role.findOrFail(params.id)

    return view.render('pages/roles/edit', { role })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('update')

    const role = await Role.findOrFail(params.id)

    const data = await request.validate(RoleUpdateValidator)

    role.merge(data)

    await role.save()

    session.flash('success', 'Role modifié avec succès')
    return response.redirect().toRoute('RolesController.show', { id: role.id })
  }

  public async destroy({ response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('delete')

    const role = await Role.findOrFail(params.id)

    await role.delete()

    session.flash('success', 'Role supprimé avec succès')
    return response.redirect().toRoute('RolesController.index')
  }
}
