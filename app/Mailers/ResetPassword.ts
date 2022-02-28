import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import mjml from 'mjml'
import Profile from 'App/Models/Profile'
import Application from '@ioc:Adonis/Core/Application'

export default class EmailValidation extends BaseMailer {
  constructor(private user: User, private profile: Profile, private url: string) {
    super()
  }

  public async prepare(message: MessageContract) {
    const html = mjml(
      await View.render('emails/reset_password', { url: this.url, profile: this.profile })
    ).html

    message
      .embed(Application.publicPath('images/mail_logo_team.png'), 'mail_logo_team')
      .embed(Application.publicPath('images/mail_globe.png'), 'mail_globe')
      .embed(Application.publicPath('images/mail_twitter.png'), 'mail_twitter')
      .subject(`[${Env.get('EMAIL_HOST')}] Réinitialisation de votre mot de passe`)
      .from(`no-reply@${Env.get('EMAIL_HOST')}`)
      .to(this.user.email)
      .html(html)
  }
}
