import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import Database from '@ioc:Adonis/Lucid/Database'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Profile from 'App/Models/Profile'

export default class ProfileFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Profile, Profile>

  // school[]
  public school(ids: number[]) {
    this.$query.whereIn('school_id', ids)
  }

  // skill[]
  public skill(ids: number[]) {
    const dataInPivot = Database.from('skills_profiles')
      .select('profile_id')
      .whereIn('skill_id', ids)
    this.$query.whereIn('id', dataInPivot)
  }

  // focusInterest[]
  public focusInterest(ids: number[]) {
    const dataInPivot = Database.from('focus_interests_profiles')
      .select('profile_id')
      .whereIn('focus_interest_id', ids)
    this.$query.whereIn('id', dataInPivot)
  }
}
