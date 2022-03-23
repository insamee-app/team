import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subject from 'App/Models/Subject'
import SubjectStoreValidator from 'App/Validators/SubjectStoreValidator'
import SubjectUpdateValidator from 'App/Validators/SubjectUpdateValidator'

export default class SubjectsController {
  public async index({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SubjectPolicy').authorize('viewList')

    const subjects = await Subject.query().orderBy('name', 'asc')

    return view.render('pages/subjects/index', { subjects })
  }

  public async create({ view, bouncer }: HttpContextContract) {
    await bouncer.with('SubjectPolicy').authorize('create')

    return view.render('pages/subjects/create')
  }

  public async store({ bouncer, response, request, session }: HttpContextContract) {
    await bouncer.with('SubjectPolicy').authorize('create')

    const data = await request.validate(SubjectStoreValidator)

    const subject = await Subject.create(data)

    session.flash('success', 'Matière créée avec succès')
    return response.redirect().toRoute('SubjectsController.show', { id: subject.id })
  }

  public async show({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('SubjectPolicy').authorize('view')

    const subject = await Subject.query().where('id', params.id).firstOrFail()

    return view.render('pages/subjects/show', { subject })
  }

  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('SubjectPolicy').authorize('update')

    const subject = await Subject.query().where('id', params.id).firstOrFail()

    return view.render('pages/subjects/edit', { subject })
  }

  public async update({ request, response, params, bouncer, session }: HttpContextContract) {
    await bouncer.with('SubjectPolicy').authorize('update')

    const subject = await Subject.query().where('id', params.id).firstOrFail()

    const data = await request.validate(SubjectUpdateValidator)

    subject.name = data.name

    await subject.save()

    session.flash('success', 'Matière modifiée avec succès')
    return response.redirect().toRoute('SubjectsController.show', { id: subject.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('SubjectPolicy').authorize('delete')

    const subject = await Subject.query().where('id', params.id).firstOrFail()

    await subject.delete()

    session.flash('success', 'Matière supprimée avec succès')
    return response.redirect().toRoute('SubjectsController.index')
  }
}
