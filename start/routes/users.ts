import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/', 'UsersController.index')
  Route.get('users/:id', 'UsersController.show')
  Route.delete('users/:id', 'UsersController.destroy')
  Route.put('users/:id/block', 'UsersController.block')
  Route.delete('users/:id/block', 'UsersController.unblock')
  Route.put('users/:id/moderator', 'UsersController.makeModerator')
  Route.delete('users/:id/moderator', 'UsersController.removeModerator')
  Route.put('users/:id/admin', 'UsersController.makeAdmin')
  Route.delete('users/:id/admin', 'UsersController.removeAdmin')
}).middleware('auth')
