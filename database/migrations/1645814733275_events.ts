import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('name').notNullable()
      table.string('description', 2048).notNullable()
      table.integer('status').unsigned().notNullable()
      table.integer('type').unsigned().notNullable()
      table.string('location').nullable()
      table.timestamp('start_at', { useTz: true }).notNullable()
      table.timestamp('end_at', { useTz: true }).notNullable()
      table.string('tickets_url').nullable()
      table.string('url').nullable()

      table.uuid('organizer_association_id').nullable().references('id').inTable('associations')
      table.uuid('organizer_school_id').nullable().references('id').inTable('schools')
      table.uuid('creator_id').notNullable().references('id').inTable('users')

      table.json('image').nullable()

      table.timestamp('deleted_at', { useTz: true })
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
