import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Schools extends BaseSchema {
  protected tableName = 'schools'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.json('picture').nullable()

      // TODO: Add field for picture and add it to the model, then, create page and update index and show schools and show user (like associations) (use the figma)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('picture')
    }
  }
}
