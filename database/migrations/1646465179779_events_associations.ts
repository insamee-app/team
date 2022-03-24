import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EventsAssociations extends BaseSchema {
  protected tableName = 'events_associations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['event_id', 'association_id'])
      table.uuid('event_id').notNullable().references('id').inTable('events')
      table.uuid('association_id').notNullable().references('id').inTable('associations')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
