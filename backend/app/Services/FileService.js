'use strict'

const Database = use('Database')

const File = use('App/Models/File')

class FileService {
  async save ({ id, ...data }) {
    let file = false;
    const trx = await Database.beginTransaction()

    try {
      if (id) {
        file = await File.findOrFail(id)

        await file.merge(data)
      } else {
        file = await File.create(data)
      }

      trx.commit()

      await file.loadMany(['user'])
      return file
    } catch(e) {
      trx.rollback()
      return false
    }

  }

  async delete(id) {
    const file = await File.findOrFail(id)

    const deleted = await file.delete()

    return deleted
  }
}

module.exports = new FileService()
