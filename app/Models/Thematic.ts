import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Association from './Association'

export default class Thematic extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @hasMany(() => Association, {
    foreignKey: 'thematicId',
    localKey: 'id',
  })
  public associations: HasMany<typeof Association>
}
