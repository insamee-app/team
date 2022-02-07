import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Report from './Report'
import { ReasonType } from 'App/Enums/ReasonType'

export default class Reason extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public type: ReasonType

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Report, {
    localKey: 'id',
    foreignKey: 'reasonId',
  })
  public reports: HasMany<typeof Report>
}
