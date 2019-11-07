'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to api!' }
})

Route.post('users', 'UserController.store').validator('User/Store')
Route.post('sessions', 'SessionController.store').validator('Session/Store')
Route.post('forgot-password', 'ForgotPasswordController.store').validator('ForgotPassword/Store')
Route.put('forgot-password', 'ForgotPasswordController.update').validator('ForgotPassword/Update')

Route.get('posts', 'PostController.index')
Route.get('posts/:id', 'PostController.show')

Route.get('files/:id', 'FileController.show')
/**
 * Private Routes (Authenticated)
 */
Route.group(() => {
  Route.resource('users', 'UserController').apiOnly()

  Route.get('files', 'FileController.index')
  Route.post('files', 'FileController.store')
  Route.put('files/:id', 'FileController.update')
  Route.delete('files/:id', 'FileController.delete')

  Route.post('posts', 'PostController.store').validator('Post/Store')
  Route.delete('posts/:id', 'PostController.delete')

  Route.post('tags', 'TagController.store').validator('Tag/Store')
  Route.put('tags/:id', 'TagController.update').validator('Tag/Update')
  Route.resource('tags', 'TagController').except('store', 'update')

  Route.resource('posts-tags', 'PostTagsController').apiOnly()

  Route.resource('permissions', 'PermissionController').apiOnly()
  Route.resource('roles', 'RoleController').apiOnly()
}).middleware('auth')
