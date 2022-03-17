import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tutorats extends BaseSchema {
  protected tableName = 'tutorats'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.string('description', 2048).notNullable()
      table.integer('type').nullable()
      table.integer('kind').notNullable()
      table.integer('status').notNullable()
      table.integer('attendee_capacity').nullable()

      table.uuid('subject_id').references('id').inTable('subjects')
      table.uuid('school_id').references('id').inTable('schools')
      table.uuid('creator_id').references('id').inTable('users')

      table.timestamp('start_at', { useTz: true }).notNullable()
      table.timestamp('end_at', { useTz: true }).notNullable()

      table.timestamp('deleted_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
