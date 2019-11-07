'use strict'

const Post = use('App/Models/Post')
const PostService = use('App/Services/PostService')

class PostController {
  async index ({ response, request }) {
    const page = request.input('page') || 1

    const post = await Post.query()
      .with('autor')
      .paginate(page)

    return response.status(200).json(post);
  }

  async store ({ request, response, auth }) {
    const data = request.only([
      'color',
      'title',
      'description',
      'tags'
    ])

    const post = await PostService.save({...data, autor_id: auth.user.id})

    if (post) {
      return response.status(201).json(post);
    }

    return response.status(422);
  }

  async show ({ params, response }) {
    try {
      const post = await Post.findOrFail(params.id)

      await post.loadMany(['autor', 'tags'])

      return response.status(200).json(post);
    } catch(e) {
      return response.status(404).json();
    }
  }

  async update ({ params, request, response }) {
    const data = request.only([
      'color',
      'title',
      'description',
      'tags'
    ])

    const post = await PostService.save({...data, id: params.id})

    if (post) {
      return response.status(200).json(post);
    }

    return response.status(422);
  }

  async destroy ({ params, response }) {
    const deleted = await PostService.delete(params.id)

    if (deleted) {
      return response.status(200)
    }

    return response.status(422)
  }
}

module.exports = PostController
