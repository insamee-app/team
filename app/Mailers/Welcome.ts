import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import mjml from 'mjml'
import Profile from 'App/Models/Profile'

export default class Welcome extends BaseMailer {
  constructor(private user: User, private profile: Profile, private url: string) {
    super()
  }

  public async prepare(message: MessageContract) {
    const html = mjml(
      await View.render('emails/welcome', { url: this.url, profile: this.profile })
    ).html

    message
      .subject(`[${Env.get('EMAIL_HOST')}] Bienvenue`)
      .from(`no-reply@${Env.get('EMAIL_HOST')}`)
      .to(this.user.email)
      .html(html)
  }
}
