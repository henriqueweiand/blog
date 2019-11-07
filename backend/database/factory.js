'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    name: faker.name(),
    password: faker.password()
  }
})

Factory.blueprint('App/Models/Post', async (faker) => {
  const user = await Factory
    .model('App/Models/User')
    .create()

  return {
    title: faker.string(),
    description: faker.string(),
    autor_id: user.id
  }
})
