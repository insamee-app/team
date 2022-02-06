import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Reason from './Reason'
import User from './User'
import Association from './Association'
import School from './School'
import { ReportEntity } from 'App/Enums/ReportEntity'
import Profile from './Profile'

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public number: string

  @column()
  public reporterId: string

  @column()
  public reasonId: string

  @column()
  public description: string

  @column()
  public entityId: string

  @column()
  public entityType: ReportEntity

  @column.dateTime({ autoCreate: false })
  public resolvedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'reporterId',
  })
  public reporter: BelongsTo<typeof User>

  @belongsTo(() => Reason, {
    localKey: 'id',
    foreignKey: 'reasonId',
  })
  public reason: BelongsTo<typeof Reason>

  @belongsTo(() => Profile, {
    localKey: 'id',
    foreignKey: 'entityId',
  })
  public profile: BelongsTo<typeof Profile>

  @belongsTo(() => Association, {
    localKey: 'id',
    foreignKey: 'entityId',
  })
  public association: BelongsTo<typeof Association>

  @belongsTo(() => School, {
    localKey: 'id',
    foreignKey: 'entityId',
  })
  public school: BelongsTo<typeof School>
}
