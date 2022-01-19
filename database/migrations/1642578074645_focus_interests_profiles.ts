import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FocusInterestsProfiles extends BaseSchema {
  protected tableName = 'focus_interests_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['focus_interest_id', 'profile_id'])
      table.uuid('focus_interest_id').notNullable().references('id').inTable('focus_interests')
      table.uuid('profile_id').notNullable().references('id').inTable('profiles')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
