import { column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import AppSoftDeletes from './AppSoftDeletes'
import Profile from './Profile'

export default class FocusInterest extends AppSoftDeletes {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @manyToMany(() => Profile, {
    pivotTable: 'focus_interests_profiles',
    localKey: 'id',
    pivotForeignKey: 'focus_interest_id',
    pivotRelatedForeignKey: 'profile_id',
    relatedKey: 'id',
  })
  public profiles: ManyToMany<typeof Profile>
}
