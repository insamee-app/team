import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import {
  beforeFetch,
  beforeFind,
  beforePaginate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'
import { SubjectType } from 'App/Enums/SubjectType'
import { DateTime } from 'luxon'
import AppSoftDeletes from './AppSoftDeletes'
import Association from './Association'
import ProfileFilter from './Filters/ProfileFilter'
import FocusInterest from './FocusInterest'
import Report from './Report'
import Role from './Role'
import School from './School'
import Skill from './Skill'
import Subject from './Subject'
import User from './User'

export default class Profile extends compose(AppSoftDeletes, Filterable) {
  public static $filter = () => ProfileFilter

  @column({ isPrimary: true })
  public id: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @attachment({ folder: 'avatars', preComputeUrl: true })
  public avatar: AttachmentContract | null

  @column()
  public graduationYear?: number

  @column()
  public bio?: string

  @column()
  public roleId: string

  @column()
  public userId: string

  @column()
  public schoolId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => School, {
    foreignKey: 'schoolId',
    localKey: 'id',
  })
  public school: BelongsTo<typeof School>

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
    localKey: 'id',
  })
  public role: BelongsTo<typeof Role>

  @manyToMany(() => Skill, {
    pivotTable: 'skills_profiles',
    localKey: 'id',
    pivotForeignKey: 'profile_id',
    pivotRelatedForeignKey: 'skill_id',
    relatedKey: 'id',
  })
  public skills: ManyToMany<typeof Skill>

  @manyToMany(() => FocusInterest, {
    pivotTable: 'focus_interests_profiles',
    localKey: 'id',
    pivotForeignKey: 'profile_id',
    pivotRelatedForeignKey: 'focus_interest_id',
    relatedKey: 'id',
  })
  public focusInterests: ManyToMany<typeof FocusInterest>

  @manyToMany(() => Subject, {
    pivotTable: 'subjects_profiles',
    localKey: 'id',
    pivotForeignKey: 'profile_id',
    pivotRelatedForeignKey: 'subject_id',
    relatedKey: 'id',
    onQuery: (query) => {
      query.wherePivot('type', SubjectType.Favorite)
    },
  })
  public preferredSubjects: ManyToMany<typeof Subject>

  @manyToMany(() => Association, {
    pivotTable: 'profiles_associations',
    localKey: 'id',
    pivotForeignKey: 'profile_id',
    pivotRelatedForeignKey: 'association_id',
    relatedKey: 'id',
  })
  public associations: ManyToMany<typeof Association>

  @hasMany(() => Report, {
    localKey: 'id',
    foreignKey: 'entityId',
  })
  public reports: HasMany<typeof Report>

  @beforeFind()
  @beforeFetch()
  public static ignoreBlockedUser(query: ModelQueryBuilderContract<typeof Profile>) {
    if (query['ignoreBlocked'] === false) {
      return
    }

    query.whereHas('user', (userQuery) => userQuery.whereNull('blocked_at'))
  }

  @beforePaginate()
  public static ignoreBlockedUserPaginate([countQuery, query]): void {
    countQuery['ignoreBlocked'] = query['ignoreBlocked']
    this.ignoreBlockedUser(countQuery)
  }

  public static disableIgnoreBlockedUser(query: ModelQueryBuilderContract<typeof Profile>) {
    if (query['ignoreBlocked'] === false) {
      return query
    }
    query['ignoreBlocked'] = false
    return query
  }

  public static withBlockedUser(this: typeof Profile) {
    return this.disableIgnoreBlockedUser(this.query())
  }
}
