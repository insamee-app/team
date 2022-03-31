import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProfilesEvents extends BaseSchema {
  protected tableName = 'profiles_events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['profile_id', 'event_id'])
      table.uuid('event_id').notNullable().references('id').inTable('events')
      table.uuid('profile_id').notNullable().references('id').inTable('profiles')

      table.integer('state').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
