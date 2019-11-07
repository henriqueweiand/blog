'use strict'

class PostStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users,username',
      email: 'required|email',
      password: 'required',
      name: 'required',
    }
  }
}

module.exports = PostStore
