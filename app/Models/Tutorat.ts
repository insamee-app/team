import { DateTime } from 'luxon'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import AppSoftDeletes from './AppSoftDeletes'
import Subject from './Subject'
import School from './School'
import User from './User'

export default class Tutorat extends AppSoftDeletes {
  @column({ isPrimary: true })
  public id: string

  @column()
  public description: string

  @column()
  public type?: number

  @column()
  public kind: number

  @column()
  public status: number

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
}
