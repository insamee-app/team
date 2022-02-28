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

// Avoid to query the database if params does not match
Route.where('id', {
  match: /^[0-9a-zA-F]{8}-[0-9a-zA-F]{4}-[0-9a-zA-F]{4}-[0-9a-zA-F]{4}-[0-9a-zA-F]{12}$/,
})

Route.get('/', async ({ view, auth, response }) => {
  if (auth.user) {
    return response.redirect().toRoute('ProfilesController.index')
  }

  return view.render('pages/home')
}).as('home')

Route.get('/home', async ({ view }) => {
  return view.render('pages/home')
})

import './routes/static'

import './routes/auth'
import './routes/users'
import './routes/profiles'
import './routes/schools'
import './routes/associations'

import './routes/reports'

// Temporary
Route.get('tutorats', ({ response }) => {
  return response.redirect('/')
}).as('TutoratsController.index')
// Temporary
Route.get('events', ({ response }) => {
  return response.redirect('/')
}).as('EventsController.index')

Route.group(() => {
  Route.resource('roles', 'RolesController')
  Route.resource('skills', 'SkillsController')
  Route.resource('focus-interests', 'FocusInterestsController')
  Route.resource('thematics', 'ThematicsController')
  Route.resource('tags', 'TagsController')
  Route.resource('reasons', 'ReasonsController')
}).middleware('auth')
