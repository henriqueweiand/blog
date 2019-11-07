'use strict'

const PostTag = use('App/Models/PostTag')

class PostTagsController {
  async index () {
    const posttag = await PostTag.query().fetch()

    return posttag
  }

  async store ({ request, params, auth }) {
    const data = request.only([
      'post_iid',
      'tag_id',
    ])

    const posttag = await PostTag.create({ data })

    return posttag
  }

  async show ({ params }) {
    const posttag = await PostTag.findOrFail(params.id)

    return posttag
  }

  async update ({ params, request }) {
    const data = request.only([
      'post_id',
      'tag_id',
    ])

    const posttag = await PostTag.findOrFail(params.id)

    await posttag.merge(data)

    await posttag.save()

    return posttag
  }

  async destroy ({ params }) {
    const posttag = await PostTag.findOrFail(params.id)

    await posttag.delete()
  }
}

module.exports = PostTagsController
