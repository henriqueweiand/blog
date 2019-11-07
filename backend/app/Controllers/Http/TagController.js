'use strict'

const Tag = use('App/Models/Tag')
const TagService = use('App/Services/TagService')

class TagController {
  async index ({ response }) {

    const tag = await Tag.query().fetch()

    return response.status(200).json(tag);
  }

  async store ({ request, response }) {
    const data = request.only([
      'name',
    ])

    const tag = await TagService.save(data)

    if (tag) {
      return response.status(201).json(tag);
    }

    return response.status(422);
  }

  async show ({ params, response }) {
    const tag = await Tag.findOrFail(params.id)

    return response.status(201).json(tag);
  }

  async update ({ params, request, response }) {
    const data = request.only([
      'name',
    ])

    const tag = await TagService.save({...data, id: params.id})

    if (tag) {
      return response.status(200).json(tag);
    }

    return response.status(422);
  }

  async destroy ({ params, response }) {
    const deleted = await TagService.delete(params.id)

    if (deleted) {
      return response.status(200)
    }

    return response.status(422)
  }
}

module.exports = TagController
