import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('facebook_url', 255).nullable()
      table.string('instagram_url', 255).nullable()
      table.string('twitter_url', 255).nullable()
      table.string('linkedin_url', 255).nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('facebook_url')
      table.dropColumn('instagram_url')
      table.dropColumn('twitter_url')
      table.dropColumn('linkedin_url')
    })
  }
}
