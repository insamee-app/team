import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SubjectsProfiles extends BaseSchema {
  protected tableName = 'subjects_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['subject_id', 'profile_id', 'type'])
      table.uuid('subject_id').notNullable().references('id').inTable('subjects')
      table.uuid('profile_id').notNullable().references('id').inTable('profiles')

      table.integer('type').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
