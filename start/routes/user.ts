import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('me', 'ProfilesController.me')
}).middleware('auth')
