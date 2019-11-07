'use strict'

class TagUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    const name = this.ctx.request.input('name')

    return {
      name: `required|unique:tags,name,${name}`,
    }
  }
}

module.exports = TagUpdate
