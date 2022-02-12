import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/', 'UsersController.index')
  Route.get('users/:id', 'UsersController.show')
  Route.put('users/:id/block', 'UsersController.block')
  Route.delete('users/:id/block', 'UsersController.unblock')
}).middleware('auth')
