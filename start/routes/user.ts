import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('me', 'ProfilesController.me')
  Route.get('me/edit', 'ProfilesController.edit')
  Route.patch('me', 'ProfilesController.update')

  Route.get('me/avatar/edit', 'ProfilesAvatarsController.edit')
  Route.put('me/avatar', 'ProfilesAvatarsController.update')
  Route.delete('me/avatar', 'ProfilesAvatarsController.destroy')
}).middleware('auth')
