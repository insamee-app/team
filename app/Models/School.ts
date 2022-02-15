import { DateTime } from 'luxon'
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'
import Association from './Association'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import Report from './Report'
import AppSoftDeletes from './AppSoftDeletes'

export default class School extends AppSoftDeletes {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public hostname: string

  @column()
  public city: string

  @column()
  public website?: string

  @column()
  public overview?: string

  @attachment({ folder: 'banners', preComputeUrl: true })
  public banner?: AttachmentContract | null

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

  @hasMany(() => Report, {
    localKey: 'id',
    foreignKey: 'entityId',
  })
  public reports: HasMany<typeof Report>
}
