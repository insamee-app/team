import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Events from 'App/Models/Events'

export default class EventFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Events, Events>

  // public method (value: any): void {
  //   this.$query.where('name', value)
  // }
}
