'use strict'

const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', table => {
      table.increments()
      table.string('name').notNullable()
      table.text('key').notNullable()
      table.text('url').notNullable()
      table.text('description')
      table.string('content_type', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
