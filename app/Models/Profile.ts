import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import School from './School'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import Skill from './Skill'
import FocusInterest from './FocusInterest'
import Association from './Association'
import Report from './Report'
import Role from './Role'

export default class Profile extends BaseModel {
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
}
