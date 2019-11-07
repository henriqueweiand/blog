'use strict'

const File = use('App/Models/File')

const Drive = use('Drive')
const FileService = use('App/Services/FileService')

class FileController {
  async index () {
    const file = await File.query()
      .fetch()

    return file
  }

  async store ({ request, response }) {
    request.multipart.file('file', {}, async file => {
      try {
        const ContentType = file.headers['content-type']
        const ACL = 'public-read'
        const Key = `${(Math.random() * 100).toString(32)}-${file.clientName}`

        const url = await Drive.put(Key, file.stream, {
          ContentType,
          ACL
        })

        await FileService.save({
          name: file.clientName,
          key: Key,
          url,
          content_type: ContentType,
        })

        if (file) {
          return response.status(201).json(file);
        }
      } catch(e) {
        return response.status(422);
      }
    }).process()
  }

  async show ({ params, response }) {
    try {
      const file = await File.findOrFail(params.id)

      response.implicitEnd = false
      response.header('Content-Type', file.content_type)

      const stream = await Drive.getStream(file.key)

      stream.pipe(response.response)
    } catch(e) {
      return response.status(422);
    }
  }

  async delete ({ params, response }) {
    try {
      const file = await File.findOrFail(params.id)

      await Drive.delete(file.key)
      await file.delete()

      return response.status(204);
    } catch(e) {
      return response.status(422);
    }
  }
}

module.exports = FileController
