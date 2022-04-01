import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserStatus } from 'App/Enums/UserStatus'
import FocusInterest from 'App/Models/FocusInterest'
import User from 'App/Models/User'
import FocusInterestStoreValidator from 'App/Validators/FocusInterestStoreValidator'
import FocusInterestUpdateValidator from 'App/Validators/FocusInterestUpdateValidator'

export default class FocusInterestsController {
  private PER_PAGE = 10

  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('viewList')

    const focusInterests = await FocusInterest.query().orderBy('name', 'asc')

    return view.render('pages/focus-interests/index', { focusInterests })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('create')

    return view.render('pages/focus-interests/create')
  }

  public async store({ response, request, bouncer, session }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('create')

    const data = await request.validate(FocusInterestStoreValidator)

    const focusInterest = await FocusInterest.create(data)

    session.flash('success', "Centre d'intérêt créé avec succès")
    return response.redirect().toRoute('FocusInterestsController.show', { id: focusInterest.id })
  }

  public async show({ request, view, params, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('view')

    const { page, ...qs } = request.qs()

    const focusInterest = await FocusInterest.query().where('id', params.id).firstOrFail()

    const profiles = await focusInterest
      .related('profiles')
      .query()
      .preload('focusInterests')
      .whereNotIn('user_id', User.query().select('id').where('status', UserStatus.Pending))
      .paginate(page, this.PER_PAGE)

    profiles.baseUrl(request.url()).queryString(qs)

    return view.render('pages/focus-interests/show', { focusInterest, profiles })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('update')

    const focusInterest = await FocusInterest.query().where('id', params.id).firstOrFail()

    return view.render('pages/focus-interests/edit', { focusInterest })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('update')

    const focusInterest = await FocusInterest.query().where('id', params.id).firstOrFail()

    const data = await request.validate(FocusInterestUpdateValidator)

    focusInterest.merge(data)

    await focusInterest.save()

    session.flash('success', "Centre d'intérêt modifié avec succès")
    return response.redirect().toRoute('FocusInterestsController.show', { id: focusInterest.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('delete')

    const focusInterest = await FocusInterest.query().where('id', params.id).firstOrFail()

    await focusInterest.delete()

    session.flash('success', "Centre d'intérêt supprimé avec succès")
    return response.redirect().toRoute('FocusInterestsController.index')
  }
}
