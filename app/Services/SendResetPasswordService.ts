import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import ResetPassword from 'App/Mailers/ResetPassword'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class SendResetPasswordService {
  private alreadySendHandler: any
  private afterSendHandler: any

  constructor(private user: User, private profile: Profile) {}

  public alreadySend(handler: any): this {
    this.alreadySendHandler = handler
    return this
  }

  public afterSend(handler: any): this {
    this.afterSendHandler = handler
    return this
  }

  private canSendAgain(): boolean {
    const now = DateTime.local()
    return (
      // No time has been set or the time has been set more than 10 minutes ago
      !this.user.sendResetPasswordAt ||
      (!!this.user.sendResetPasswordAt &&
        now.diff(this.user.sendResetPasswordAt, 'minutes').minutes > 10)
    )
  }

  private async addUserResetPasswordAt() {
    this.user.sendResetPasswordAt = DateTime.local()
    await this.user.save()
  }

  private url() {
    return Route.makeSignedUrl(
      'AuthController.changePassword',
      {
        user_id: this.user.id,
      },
      { expiresIn: '10m' }
    )
  }

  private sendEmail() {
    new ResetPassword(this.user, this.profile, `${Env.get('APP_URL')}${this.url()}`).sendLater()
  }

  public async exec(): Promise<any> {
    if (!this.canSendAgain()) {
      return this.alreadySendHandler()
    }

    await this.addUserResetPasswordAt()
    this.sendEmail()

    return this.afterSendHandler()
  }

  /**
   * Implementation of `then` for the promise API
   */
  public then(resolve: any, reject?: any): any {
    return this.exec().then(resolve, reject)
  }

  /**
   * Implementation of `catch` for the promise API
   */
  public catch(reject: any): any {
    return this.exec().catch(reject)
  }

  /**
   * Implementation of `finally` for the promise API
   */
  public finally(fullfilled: any) {
    return this.exec().finally(fullfilled)
  }

  /**
   * Required when Promises are extended
   */
  public get [Symbol.toStringTag]() {
    return this.constructor.name
  }
}
