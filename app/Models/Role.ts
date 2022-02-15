import { column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import AppSoftDeletes from './AppSoftDeletes'
import Profile from './Profile'

export default class Role extends AppSoftDeletes {
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
