import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Association from './Association'

export default class School extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public host: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Profile, {
    foreignKey: 'schoolId',
    localKey: 'id',
  })
  public profiles: HasMany<typeof Profile>

  @hasMany(() => Association, {
    foreignKey: 'schoolId',
    localKey: 'id',
  })
  public associations: HasMany<typeof Association>
}
