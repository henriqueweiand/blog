'use strict'

class TagStore {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|unique:tags,name',
    }
  }
}

module.exports = TagStore
