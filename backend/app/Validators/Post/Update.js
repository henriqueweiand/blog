'use strict'

class PostUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required',
    }
  }
}

module.exports = PostUpdate
