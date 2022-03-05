import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import EmailValidation from 'App/Mailers/EmailValidation'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import { UserStatus } from 'App/Enums/UserStatus'

export default class SendVerifyEmailService {
  private alreadyVerifiedHandler: any
  private alreadySendHandler: any
  private afterSendHandler: any

  constructor(private user: User, private profile: Profile) {}

  public alreadyVerified(handler: any): this {
    this.alreadyVerifiedHandler = handler
    return this
  }

  public alreadySend(handler: any): this {
    this.alreadySendHandler = handler
    return this
  }

  public afterSend(handler: any): this {
    this.afterSendHandler = handler
    return this
  }

  private isAlreadyVerified(): boolean {
    return this.user.status === UserStatus.Active
  }

  private canSendAgain(): boolean {
    const now = DateTime.local()
    return (
      // No time has been set or the time has been set more than 10 minutes ago
      !this.user.sendValidationAt ||
      (!!this.user.sendValidationAt && now.diff(this.user.sendValidationAt, 'minutes').minutes > 10)
    )
  }

  private async addUserSendValidationAt() {
    this.user.sendValidationAt = DateTime.local()
    await this.user.save()
  }

  private url() {
    return Route.makeSignedUrl(
      'AuthController.validateUser',
      {
        id: this.user.id,
      },
      { expiresIn: '10m' }
    )
  }

  private sendEmail() {
    new EmailValidation(this.user, this.profile, `${Env.get('APP_URL')}${this.url()}`).sendLater()
  }

  public async exec(): Promise<any> {
    if (this.isAlreadyVerified()) {
      return this.alreadyVerifiedHandler()
    }

    if (!this.canSendAgain()) {
      return this.alreadySendHandler()
    }

    await this.addUserSendValidationAt()
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
