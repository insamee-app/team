import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TagsAssociations extends BaseSchema {
  protected tableName = 'tags_associations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['tag_id', 'association_id'])
      table.uuid('tag_id').notNullable().references('id').inTable('tags')
      table.uuid('association_id').notNullable().references('id').inTable('associations')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
