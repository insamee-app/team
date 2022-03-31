import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { TutoratKind } from 'App/Enums/TutoratKind'
import { TutoratStatus } from 'App/Enums/TutoratStatus'
import Tutorat from 'App/Models/Tutorat'

export default class TutoratFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Tutorat, Tutorat>

  public setup() {
    // Create a date 15 after today
    const date = new Date()
    date.setDate(date.getDate() - 15)
    this.$query.where((query) => {
      query.where('kind', TutoratKind.Offer)
      query.where('status', TutoratStatus.Published)
      query.orWhere((query) => {
        query.where('kind', '=', TutoratKind.Demand).andWhere('created_at', '>=', date)
      })
    })
  }

  // subjects[]
  public subjects(ids: string[]) {
    return this.$query.andWhereIn('subject_id', ids)
  }

  // schools[]
  public schools(ids: string[]) {
    this.$query.andWhereIn('school_id', ids)
  }

  // tutorat that start after the given date
  public date(date: string) {
    this.$query.andWhere('start_at', '>=', date)
  }
}
