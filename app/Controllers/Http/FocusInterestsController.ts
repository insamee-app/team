import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FocusInterest from 'App/Models/FocusInterest'
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

  public async store({ response, request, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('create')

    const data = await request.validate(FocusInterestStoreValidator)

    const focusInterest = await FocusInterest.create(data)

    return response.redirect().toRoute('FocusInterestsController.show', { id: focusInterest.id })
  }

  public async show({ request, view, params, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('view')

    const page = request.input('page')

    const focusInterest = await FocusInterest.findOrFail(params.id)
    const profiles = await focusInterest
      .related('profiles')
      .query()
      .preload('focusInterests', (focusInterest) => focusInterest.groupLimit(3))
      .paginate(page, this.PER_PAGE)

    return view.render('pages/focus-interests/show', { focusInterest, profiles })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('update')

    const focusInterest = await FocusInterest.findOrFail(params.id)

    return view.render('pages/focus-interests/edit', { focusInterest })
  }

  public async update({ request, response, params, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('update')

    const focusInterest = await FocusInterest.findOrFail(params.id)

    const data = await request.validate(FocusInterestUpdateValidator)

    focusInterest.merge(data)

    await focusInterest.save()

    return response.redirect().toRoute('FocusInterestsController.show', { id: focusInterest.id })
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.with('FocusInterestPolicy').authorize('delete')

    const focusInterest = await FocusInterest.findOrFail(params.id)

    await focusInterest.delete()

    return response.redirect().toRoute('FocusInterestsController.index')
  }
}
