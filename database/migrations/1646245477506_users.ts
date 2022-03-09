import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('send_validation_at', { useTz: true }).nullable()
      table.timestamp('send_reset_password_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('send_validation_at')
      table.dropColumn('send_reset_password_at')
    })
  }
}
