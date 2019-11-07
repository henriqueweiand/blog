const { test, trait, afterEach } =  use('Test/Suite')('User registration')
const User = use('App/Models/User')

trait('Test/ApiClient')

afterEach(async () => {
  await User.query().delete()
})

test('Cria um novo usuário', async({ client, assert }) => {
  const response = await client.post('/users').send({
    "username": "henrique",
    "password": "123",
    "email": "henriqueweiand@gmail.com",
    "name": "henrique weiand"
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    "username": "henrique",
    "email": "henriqueweiand@gmail.com",
  })
})

test('Não cria um novo usuário', async({ client, assert }) => {
  const response = await client.post('/users').end()

  response.assertStatus(400)
  const user = await User.findBy('email', 'henriqueweiand@gmail.com')
  assert.isNull(user)
})
