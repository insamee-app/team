import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  beforeFetch,
  beforeFind,
  ModelQueryBuilderContract,
  beforePaginate,
} from '@ioc:Adonis/Lucid/Orm'
import { UserStatus } from 'App/Enums/UserStatus'
import Profile from './Profile'
import { UserRole } from 'App/Enums/UserRole'
import Report from './Report'
import AppSoftDeletes from './AppSoftDeletes'

export default class User extends AppSoftDeletes {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public status: UserStatus

  @column()
  public role: UserRole

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public blockedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Profile, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public profile: HasOne<typeof Profile>

  @hasMany(() => Report, {
    foreignKey: 'reporter_id',
    localKey: 'id',
  })
  public reports: HasMany<typeof Report>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeFind()
  @beforeFetch()
  public static ignoreBlocked(query: ModelQueryBuilderContract<typeof User>) {
    if (query['ignoreBlocked'] === false) {
      return
    }
    query.whereNull(`${query.model.table}.blocked_at`)
  }

  @beforePaginate()
  public static ignoreBlockedPaginate([countQuery, query]): void {
    countQuery['ignoreBlocked'] = query['ignoreBlocked']
    this.ignoreBlocked(countQuery)
  }

  public static disableIgnoreBlocked(query: ModelQueryBuilderContract<typeof User>) {
    if (query['ignoreBlocked'] === false) {
      return query
    }
    query['ignoreBlocked'] = false
    return query
  }

  public static withBlocked(this: typeof User) {
    return this.disableIgnoreBlocked(this.query())
  }

  public static onlyBlocked(this: typeof User) {
    const query = this.query()
    return this.disableIgnoreBlocked(query).whereNotNull(`${query.model.table}.blocked_at`)
  }

  public async block() {
    this.blockedAt = DateTime.local()
    await this.save()
  }

  public async unblock() {
    this.blockedAt = null
    await this.save()
  }
  public async makeMember() {
    this.role = UserRole.Member
    await this.save()
  }

  public async makeEventCreator() {
    this.role = UserRole.EventCreator
    await this.save()
  }

  public async makeEventManager() {
    this.role = UserRole.EventManager
    await this.save()
  }

  public async makeSuperEventManager() {
    this.role = UserRole.SuperEventManager
    await this.save()
  }

  public async makeAssociativeManager() {
    this.role = UserRole.AssociativeManager
    await this.save()
  }

  public async makeSuperAssociativeManager() {
    this.role = UserRole.SuperAssociativeManager
    await this.save()
  }

  public async makeSupervisor() {
    this.role = UserRole.Supervisor
    await this.save()
  }

  public async makeSuperSupervisor() {
    this.role = UserRole.SuperSupervisor
    await this.save()
  }

  public async makeModerator() {
    this.role = UserRole.Moderator
    await this.save()
  }

  public async makeAdmin() {
    this.role = UserRole.Admin
    await this.save()
  }
  public async makeSuperAdmin() {
    this.role = UserRole.SuperAdmin
    await this.save()
  }
}
