import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { TutoratKind } from 'App/Enums/TutoratKind'
import { TutoratProfileState } from 'App/Enums/TutoratProfileState'
import { TutoratStatus } from 'App/Enums/TutoratStatus'
import { TutoratType } from 'App/Enums/TutoratType'
import { DateTime } from 'luxon'
import AppSoftDeletes from './AppSoftDeletes'
import TutoratFilter from './Filters/TutoratFilter'
import Profile from './Profile'
import School from './School'
import Subject from './Subject'
import User from './User'

export default class Tutorat extends compose(AppSoftDeletes, Filterable) {
  public static $filter = () => TutoratFilter

  @column({ isPrimary: true })
  public id: string

  @column()
  public description: string

  @column()
  public type?: TutoratType

  @column()
  public kind: TutoratKind

  @column()
  public status: TutoratStatus

  @column()
  public attendeeCapacity?: number

  @column()
  public subjectId: string

  @column()
  public schoolId: string

  @column()
  public creatorId: string

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public startAt?: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public endAt?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Subject, {
    foreignKey: 'subjectId',
    localKey: 'id',
  })
  public subject: BelongsTo<typeof Subject>

  @belongsTo(() => School, {
    foreignKey: 'schoolId',
    localKey: 'id',
  })
  public school: BelongsTo<typeof School>

  @belongsTo(() => User, {
    foreignKey: 'creatorId',
    localKey: 'id',
  })
  public creator: BelongsTo<typeof User>

  @manyToMany(() => Profile, {
    pivotTable: 'profiles_tutorats',
    pivotForeignKey: 'tutorat_id',
    pivotRelatedForeignKey: 'profile_id',
    relatedKey: 'id',
    localKey: 'id',
    onQuery: (query) => {
      query.where('state', TutoratProfileState.Interested)
    },
  })
  public interestedProfiles: ManyToMany<typeof Profile>

  @manyToMany(() => Profile, {
    pivotTable: 'profiles_tutorats',
    pivotForeignKey: 'tutorat_id',
    pivotRelatedForeignKey: 'profile_id',
    relatedKey: 'id',
    localKey: 'id',
    onQuery: (query) => {
      query.where('state', TutoratProfileState.Participate)
    },
  })
  public participatingProfiles: ManyToMany<typeof Profile>

  @manyToMany(() => Profile, {
    pivotTable: 'profiles_tutorats',
    pivotForeignKey: 'tutorat_id',
    pivotRelatedForeignKey: 'profile_id',
    relatedKey: 'id',
    localKey: 'id',
  })
  public profiles: ManyToMany<typeof Profile>

  public isPassed(): boolean {
    if (!this.startAt) return false
    return this.startAt.diff(DateTime.now(), 'days').toObject().days! < 0
  }

  public isPublished(): boolean {
    return this.status === TutoratStatus.Published
  }

  public isAnOffer(): boolean {
    return this.kind === TutoratKind.Offer
  }
}
