import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.json('avatar').nullable()
      table.integer('graduation_year').nullable()
      table.string('bio', 2048).nullable()

      table.uuid('role_id').nullable().references('id').inTable('roles')
      table.uuid('user_id').notNullable().references('id').inTable('users')
      table.uuid('school_id').notNullable().references('id').inTable('schools')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
