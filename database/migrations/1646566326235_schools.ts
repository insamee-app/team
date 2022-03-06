import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schools extends BaseSchema {
  protected tableName = 'schools'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('picture').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('picture')
    })
  }
}
