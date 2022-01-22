import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SkillsProfiles extends BaseSchema {
  protected tableName = 'skills_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['skill_id', 'profile_id'])
      table.uuid('skill_id').notNullable().references('id').inTable('skills')
      table.uuid('profile_id').notNullable().references('id').inTable('profiles')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
