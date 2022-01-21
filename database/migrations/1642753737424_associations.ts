import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Associations extends BaseSchema {
  protected tableName = 'associations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('name').notNullable().unique()
      table.json('picture').nullable()
      table.string('overview', 2048).nullable()
      table.string('website').nullable()
      table.string('email').nullable()
      table.uuid('school_id').notNullable().references('id').inTable('schools')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
