import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Profile from './Profile'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @hasOne(() => Profile, {
    foreignKey: 'roleId',
    localKey: 'id',
  })
  public profile: HasOne<typeof Profile>
}
