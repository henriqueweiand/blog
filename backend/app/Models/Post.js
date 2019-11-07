'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  static get computed () {
    return ['teste']
  }

  autor () {
    return this.belongsTo('App/Models/User', 'autor_id', 'id')
  }
  tags () {
    return this.belongsToMany('App/Models/Tag').pivotTable('post_tags')
  }
}

module.exports = Post
