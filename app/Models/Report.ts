import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
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
  public reporter_id: string

  @column()
  public reason_id: string

  @column()
  public description: string

  @column()
  public entity_id: string

  @column()
  public entity_type: ReportEntity

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User, {
    localKey: 'reporter_id',
    foreignKey: 'id',
  })
  public reporter: HasOne<typeof User>

  @hasOne(() => Reason, {
    localKey: 'reason_id',
    foreignKey: 'id',
  })
  public reason: HasOne<typeof Reason>

  @hasOne(() => Profile, {
    localKey: 'entity_id',
    foreignKey: 'id',
  })
  public profile: HasOne<typeof Profile>

  @hasOne(() => Association, {
    localKey: 'entity_id',
    foreignKey: 'id',
  })
  public association: HasOne<typeof Association>

  @hasOne(() => School, {
    localKey: 'entity_id',
    foreignKey: 'id',
  })
  public school: HasOne<typeof School>
}
