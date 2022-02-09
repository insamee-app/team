import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @manyToMany(() => Profile, {
    pivotTable: 'skills_profiles',
    localKey: 'id',
    pivotForeignKey: 'skill_id',
    pivotRelatedForeignKey: 'profile_id',
    relatedKey: 'id',
  })
  public profiles: ManyToMany<typeof Profile>
}
