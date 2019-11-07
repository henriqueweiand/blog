'use strict'

const User = use('App/Models/User')

class UserController {
  async index () {
    const user = await User.query()
      .with('roles')
      .with('permissions')
      .fetch()

    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.loadMany([
      'roles',
      'permissions'
    ])

    return user
  }

  async store({ request }) {
    const data = request.only(['username', 'email', 'password', 'name', 'file_id'])

    const user = await User.create(data);

    return user;
  }

  async update ({ request, params }) {
    const { permissions, roles, ...data } = request.only(['username', 'email', 'password', 'name', 'file_id', 'roles', 'permissions'])

    const user = await User.findOrFail(params.id)

    await user.merge(data)

    await user.save()

    if (roles) {
      await user.roles().sync(roles)
    }

    if (permissions) {
      await user.permissions().sync(permissions)
    }

    await user.loadMany([
      'roles',
      'permissions'
    ])

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
