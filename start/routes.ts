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

Route.on('/').render('pages/home').as('home')

import './routes/auth'
import './routes/user'

Route.group(() => {
  Route.resource('schools', 'SchoolsController')
  Route.resource('skills', 'SkillsController')
  Route.resource('focus-interests', 'FocusInterestsController')

  Route.resource('associations', 'AssociationsController')
  Route.get('associations/:id/pictures/edit', 'AssociationsPicturesController.edit')
  Route.put('associations/:id/pictures', 'AssociationsPicturesController.update')
  Route.delete('associations/:id/pictures', 'AssociationsPicturesController.destroy')
}).middleware('auth')
