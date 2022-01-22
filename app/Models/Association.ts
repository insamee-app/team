import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import School from './School'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => School, {
    foreignKey: 'schoolId',
    localKey: 'id',
  })
  public school: BelongsTo<typeof School>
}
