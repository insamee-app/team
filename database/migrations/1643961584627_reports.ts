import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reports extends BaseSchema {
  protected tableName = 'reports'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.bigIncrements('number', { primaryKey: false }).notNullable().unique()
      table.uuid('reporter_id').notNullable().references('id').inTable('users')
      table.uuid('reason_id').notNullable().references('id').inTable('reasons')
      table.string('description', 1024).nullable()

      table.uuid('entity_id').notNullable()
      table.integer('entity_type').unsigned().notNullable()

      table.uuid('resolved_by_id').nullable().references('id').inTable('users')
      table.timestamp('resolved_at', { useTz: true }).nullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
