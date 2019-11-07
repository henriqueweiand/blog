'use strict'

const Database = use('Database')

const Post = use('App/Models/Post')
const Tag = use('App/Models/Tag')

class PostService {
  async save ({ tags, id, ...data }) {
    let post = false;
    const trx = await Database.beginTransaction()

    try {
      if (id) {
        post = await Post.findOrFail(id)

        await post.merge(data)
        await post.tags().detach()
      } else {
        post = await Post.create(data)
      }

      if (tags) {
        for (let tag of tags) {
          const currentTag = await Tag.findBy('name', tag)

          if (currentTag) {
            await post.tags().attach(currentTag.id)
          } else {
            await post.tags().create({name: tag})
          }
        }
      }

      trx.commit()

      await post.loadMany(['autor', 'tags'])
      return post
    } catch(e) {
      trx.rollback()
      return false
    }

  }

  async delete(id) {
    const post = await Post.findOrFail(id)

    const deleted = await post.delete()

    return deleted
  }
}

module.exports = new PostService()
