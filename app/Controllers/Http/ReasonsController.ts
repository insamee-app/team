import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reason from 'App/Models/Reason'
import ReasonStoreValidator from 'App/Validators/ReasonStoreValidator'
import ReasonUpdateValidator from 'App/Validators/ReasonUpdateValidator'

export default class ReasonsController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ReasonPolicy').authorize('viewList')

    const reasons = await Reason.query().orderBy('name', 'asc')

    return view.render('pages/reasons/index', { reasons })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('ReasonPolicy').authorize('create')

    return view.render('pages/reasons/create')
  }

  public async store({ response, request, bouncer, session }: HttpContextContract) {
    await bouncer.with('ReasonPolicy').authorize('create')

    const data = await request.validate(ReasonStoreValidator)

    const reason = await Reason.create(data)

    session.flash('success', 'Raison créée avec succès')
    return response.redirect().toRoute('ReasonsController.show', { id: reason.id })
  }

  public async show({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('ReasonPolicy').authorize('view')

    const reason = await Reason.query().where(params.id).firstOrFail()

    return view.render('pages/reasons/show', { reason })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('ReasonPolicy').authorize('update')

    const reason = await Reason.query().where(params.id).firstOrFail()

    return view.render('pages/reasons/edit', { reason })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('ReasonPolicy').authorize('update')

    const reason = await Reason.query().where(params.id).firstOrFail()

    const data = await request.validate(ReasonUpdateValidator)

    reason.merge(data)

    await reason.save()

    session.flash('success', 'Raison modifiée avec succès')
    return response.redirect().toRoute('ReasonsController.show', { id: reason.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('ReasonPolicy').authorize('delete')

    const reason = await Reason.query().where(params.id).firstOrFail()

    await reason.delete()

    session.flash('success', 'Raison supprimée avec succès')
    return response.redirect().toRoute('ReasonsController.index')
  }
}
