import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Reason from 'App/Models/Reason'

export default class ReasonFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Reason, Reason>

  // type
  public type(type: number) {
    this.$query.where('type', type)
  }
}
