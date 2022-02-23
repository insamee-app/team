import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfilesAssociations extends BaseSchema {
  protected tableName = 'profiles_associations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['profile_id', 'association_id'])
      table.uuid('profile_id').notNullable().references('id').inTable('profiles')
      table.uuid('association_id').notNullable().references('id').inTable('associations')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
