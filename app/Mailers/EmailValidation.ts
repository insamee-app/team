import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import mjml from 'mjml'

export default class EmailValidation extends BaseMailer {
  constructor(private user: User, private url: string) {
    super()
  }

  public async prepare(message: MessageContract) {
    const html = mjml(await View.render('emails/email_validation', { url: this.url })).html

    message
      .subject(`[${Env.get('EMAIL_HOST')}] Validation de votre compte`)
      .from(`no-reply@${Env.get('EMAIL_HOST')}`)
      .to(this.user.email)
      .html(html)
  }
}
