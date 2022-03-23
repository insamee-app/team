import { column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import AppSoftDeletes from './AppSoftDeletes'
import Profile from './Profile'

export default class Subject extends AppSoftDeletes {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @manyToMany(() => Profile, {
    pivotTable: 'subjects_profiles',
    localKey: 'id',
    pivotForeignKey: 'subject_id',
    pivotRelatedForeignKey: 'profile_id',
    relatedKey: 'id',
  })
  public profiles: ManyToMany<typeof Profile>
}
