import { Filterable } from '@ioc:Adonis/Addons/LucidFilter'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { ReasonType } from 'App/Enums/ReasonType'
import AppSoftDeletes from './AppSoftDeletes'
import ReasonFilter from './Filters/ReasonFilter'
import Report from './Report'

export default class Reason extends compose(AppSoftDeletes, Filterable) {
  public static $filter = () => ReasonFilter

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public type: ReasonType

  @hasMany(() => Report, {
    localKey: 'id',
    foreignKey: 'reasonId',
  })
  public reports: HasMany<typeof Report>
}
