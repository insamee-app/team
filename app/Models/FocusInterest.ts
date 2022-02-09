import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class FocusInterest extends BaseModel {
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
