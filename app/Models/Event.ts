import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import AppSoftDeletes from './AppSoftDeletes'
import Association from './Association'
import EventFilter from './Filters/EventFilter'
import School from './School'
import User from './User'

export default class Event extends compose(AppSoftDeletes, Filterable) {
  public static $filter = () => EventFilter

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public status: number

  @column()
  public type: number

  @column()
  public location?: string

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public startAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public endAt: DateTime

  @column()
  public ticketsUrl?: string

  @column()
  public url?: string

  @column()
  public organizerAssociationId?: string

  @column()
  public organizerSchoolId?: string

  @column()
  public creatorId: string

  @attachment({ folder: 'events', preComputeUrl: true })
  public image: AttachmentContract | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'creatorId',
  })
  public creator: BelongsTo<typeof User>

  @belongsTo(() => Association, {
    localKey: 'id',
    foreignKey: 'organizerAssociationId',
  })
  public organizerAssociation: BelongsTo<typeof Association>

  @belongsTo(() => School, {
    localKey: 'id',
    foreignKey: 'organizerSchoolId',
  })
  public organizerSchool: BelongsTo<typeof School>
}
