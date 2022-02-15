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

  @hasMany(() => Report, {
    localKey: 'id',
    foreignKey: 'reasonId',
  })
  public reports: HasMany<typeof Report>
}
