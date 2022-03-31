import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfilesTutorats extends BaseSchema {
  protected tableName = 'profiles_tutorats'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['profile_id', 'tutorat_id', 'state'])
      table.uuid('tutorat_id').notNullable().references('id').inTable('tutorats')
      table.uuid('profile_id').notNullable().references('id').inTable('profiles')

      table.integer('state').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
