import { column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import AppSoftDeletes from './AppSoftDeletes'
import Association from './Association'

export default class Tag extends AppSoftDeletes {
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
