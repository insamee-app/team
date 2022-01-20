/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'

Route.get('/', async ({ request, view }) => {
  return view.render('pages/home', { qs: request.qs() })
}).as('home')

Route.post('/', async ({ request, response }) => {
  const newPostSchema = schema.create({
    cars: schema.array().members(schema.string()),
  })

  const payload = await request.validate({ schema: newPostSchema })
  console.log(payload)
  return response.redirect().withQs(payload).toRoute('home')
})

import './routes/auth'
import './routes/user'

Route.group(() => {
  Route.resource('schools', 'SchoolsController')
  Route.resource('skills', 'SkillsController')
  Route.resource('focus-interests', 'FocusInterestsController')
}).middleware('auth')
