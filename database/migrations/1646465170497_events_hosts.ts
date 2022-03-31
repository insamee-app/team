import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventsHosts extends BaseSchema {
  protected tableName = 'events_hosts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['event_id', 'school_id'])
      table.uuid('event_id').notNullable().references('id').inTable('events')
      table.uuid('school_id').notNullable().references('id').inTable('schools')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
