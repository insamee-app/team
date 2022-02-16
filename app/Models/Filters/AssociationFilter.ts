import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import Database from '@ioc:Adonis/Lucid/Database'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Association from 'App/Models/Association'

export default class AssociationFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Association, Association>

  // schools[]
  public schools(ids: number[]) {
    this.$query.whereIn('school_id', ids)
  }

  // thematics[]
  public thematics(ids: number[]) {
    this.$query.whereIn('thematic_id', ids)
  }

  // tags[]
  public tags(ids: number[]) {
    const dataInPivot = Database.from('tags_associations')
      .select('association_id')
      .whereIn('tag_id', ids)
    this.$query.whereIn('id', dataInPivot)
  }
}
