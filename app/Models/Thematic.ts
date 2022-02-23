import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import AppSoftDeletes from './AppSoftDeletes'
import Association from './Association'

export default class Thematic extends AppSoftDeletes {
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
