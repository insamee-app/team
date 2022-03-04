import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Event from 'App/Models/Event'

export default class EventFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Event, Event>

  // schools[]
  public schools(ids: number[]) {
    this.$query.whereIn('organizer_school_id', ids)
  }

  // associations[]
  public associations(ids: number[]) {
    this.$query.whereIn('organizer_association_id', ids)
  }

  // events that start after the given date
  public date(date: string) {
    this.$query.where('start_at', '>=', date)
  }
}
