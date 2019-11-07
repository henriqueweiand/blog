'use strict'

const Database = use('Database')

const Tag = use('App/Models/Tag')

class TagService {
  async save ({ id, ...data }) {
    let tag = false;
    const trx = await Database.beginTransaction()

    try {
      if (id) {
        tag = await Tag.findOrFail(id)
        await tag.merge(data)
      } else {
        tag = await Tag.create(data)
      }

      trx.commit()

      return tag
    } catch(e) {
      trx.rollback()
      return false
    }

  }

  async delete(id) {
    const tag = await Tag.findOrFail(id)

    const deleted = await tag.delete()

    return deleted
  }
}

module.exports = new TagService()
