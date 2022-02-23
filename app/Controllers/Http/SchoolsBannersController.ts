import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import School from 'App/Models/School'
import SchoolBannerValidator from 'App/Validators/SchoolBannerValidator'

export default class SchoolsBannersController {
  public async edit({ view, params, bouncer }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('update')

    const school = await School.findOrFail(params.id)

    return view.render('pages/schools/banners/edit', {
      school,
    })
  }

  public async update({ params, request, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('update')

    const school = await School.findOrFail(params.id)

    const { banner } = await request.validate(SchoolBannerValidator)

    school.banner = Attachment.fromFile(banner)

    await school.save()

    session.flash('success', "Bannière de l'école mise à jour avec succès")
    return response.redirect().toRoute('SchoolsController.show', { id: params.id })
  }

  public async destroy({ params, response, bouncer, session }: HttpContextContract) {
    await bouncer.with('SchoolPolicy').authorize('delete')

    const school = await School.findOrFail(params.id)

    school.banner = null

    await school.save()

    session.flash('success', "Bannière de l'école supprimée avec succès")
    return response.redirect().toRoute('SchoolsController.show', { id: params.id })
  }
}
