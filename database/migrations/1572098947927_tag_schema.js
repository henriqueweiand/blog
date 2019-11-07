'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments()
      table.timestamps()
      table.string('name', 60)
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = TagSchema
