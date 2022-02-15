import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Association from './Association'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @manyToMany(() => Association, {
    pivotTable: 'tags_associations',
    localKey: 'id',
    pivotForeignKey: 'tag_id',
    pivotRelatedForeignKey: 'association_id',
    relatedKey: 'id',
  })
  public associations: ManyToMany<typeof Association>
}
