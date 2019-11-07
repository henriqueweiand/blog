const { test, trait, beforeEach } =  use('Test/Suite')('Post registration')
const Factory = use('Factory')
const Post = use('App/Models/Post')

trait('Test/ApiClient')
trait('Auth/Client')

let post = false
let user = false

beforeEach(async () => {
  await Post.query().delete()

  post = await Factory
    .model('App/Models/Post')
    .create()

  user = await Factory
    .model('App/Models/User')
    .create()
})

test('Visualizar um post', async({ client }) => {
  const response = await client.get(`/posts/${post.id}`).end()
  response.assertStatus(200)
})

test('Listar todos os post', async({ client }) => {
  const response = await client.get('/posts').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    "total": 1,
    "perPage": 20,
    "page": 1,
    "lastPage": 1,
    'data': []
  })
})

test('Cria post', async({ client }) => {
  const response = await client.post('/posts').loginVia(user).send({
    title: 'title',
    description: 'title'
  }).end()

  response.assertStatus(201)
  response.assertJSONSubset({
    title: 'title',
    description: 'title'
  })
})
