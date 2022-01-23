import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import School from './School'
import Thematic from './Thematic'
import Tag from './Tag'

export default class Association extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @attachment({ folder: 'pictures', preComputeUrl: true })
  public picture: AttachmentContract | null

  @column()
  public overview?: string

  @column()
  public website?: string

  @column()
  public email?: string

  @column()
  public schoolId: string

  @column()
  public thematicId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => School, {
    foreignKey: 'schoolId',
    localKey: 'id',
  })
  public school: BelongsTo<typeof School>

  @hasOne(() => Thematic, {
    foreignKey: 'id',
    localKey: 'thematicId',
  })
  public thematic: HasOne<typeof Thematic>

  @manyToMany(() => Tag, {
    pivotTable: 'tags_associations',
    localKey: 'id',
    pivotForeignKey: 'association_id',
    pivotRelatedForeignKey: 'tag_id',
    relatedKey: 'id',
  })
  public tags: ManyToMany<typeof Tag>
}
