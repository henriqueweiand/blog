'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static get hidden () {
    return ['password']
  }

  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  avatar () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = User
