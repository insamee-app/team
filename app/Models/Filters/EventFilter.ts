import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import Database from '@ioc:Adonis/Lucid/Database'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Event from 'App/Models/Event'

export default class EventFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Event, Event>

  // hosts[]
  public hosts(ids: string[]) {
    const dataInPivot = Database.from('events_hosts').select('event_id').whereIn('school_id', ids)
    this.$query.whereIn('id', dataInPivot)
  }

  // schools[]
  public schools(ids: string[]) {
    const dataInPivot = Database.from('events_schools').select('event_id').whereIn('school_id', ids)
    this.$query.whereIn('id', dataInPivot)
  }

  // associations[]
  public associations(ids: string[]) {
    const dataInPivot = Database.from('events_associations')
      .select('event_id')
      .whereIn('association_id', ids)
    this.$query.whereIn('id', dataInPivot)
  }

  // events that start after the given date
  public date(date: string) {
    this.$query.where('start_at', '>=', date)
  }
}
