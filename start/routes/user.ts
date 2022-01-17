import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('me', 'ProfilesController.me')
  Route.get('me/edit', 'ProfilesController.edit')
  Route.patch('me/edit', 'ProfilesController.update')
}).middleware('auth')
