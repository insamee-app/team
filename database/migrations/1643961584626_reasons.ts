import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reasons extends BaseSchema {
  protected tableName = 'reasons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table.unique(['name', 'type'])
      table.string('name').notNullable()
      table.integer('type').unsigned().notNullable()

      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
