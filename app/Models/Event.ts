import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { EventProfileState } from 'App/Enums/EventProfileState'
import { DateTime } from 'luxon'
import AppSoftDeletes from './AppSoftDeletes'
import Association from './Association'
import EventFilter from './Filters/EventFilter'
import Profile from './Profile'
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

  @manyToMany(() => Association, {
    pivotTable: 'events_associations',
    pivotForeignKey: 'event_id',
    pivotRelatedForeignKey: 'association_id',
    relatedKey: 'id',
    localKey: 'id',
  })
  public organizingAssociations: ManyToMany<typeof Association>

  @manyToMany(() => School, {
    pivotTable: 'events_schools',
    pivotForeignKey: 'event_id',
    pivotRelatedForeignKey: 'school_id',
    relatedKey: 'id',
    localKey: 'id',
  })
  public organizingSchools: ManyToMany<typeof School>

  @manyToMany(() => School, {
    pivotTable: 'events_hosts',
    pivotForeignKey: 'event_id',
    pivotRelatedForeignKey: 'school_id',
    relatedKey: 'id',
    localKey: 'id',
  })
  public hostSchools: ManyToMany<typeof School>

  @manyToMany(() => Profile, {
    pivotTable: 'profiles_events',
    pivotForeignKey: 'event_id',
    pivotRelatedForeignKey: 'profile_id',
    relatedKey: 'id',
    localKey: 'id',
    onQuery: (query) => {
      query.where('state', EventProfileState.Interested)
    },
  })
  public interestedProfiles: ManyToMany<typeof Profile>

  @manyToMany(() => Profile, {
    pivotTable: 'profiles_events',
    pivotForeignKey: 'event_id',
    pivotRelatedForeignKey: 'profile_id',
    relatedKey: 'id',
    localKey: 'id',
    onQuery: (query) => {
      query.where('state', EventProfileState.Participate)
    },
  })
  public participatingProfiles: ManyToMany<typeof Profile>
}
