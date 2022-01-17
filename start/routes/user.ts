import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('mee/:id', 'ProfilesController.show')
  Route.get('mee/:id/edit', 'ProfilesController.edit')
  Route.patch('mee/:id', 'ProfilesController.update')

  Route.get('mee/:id/avatar/edit', 'ProfilesAvatarsController.edit')
  Route.put('mee/:id/avatar', 'ProfilesAvatarsController.update')
  Route.delete('mee/:id/avatar', 'ProfilesAvatarsController.destroy')
}).middleware('auth')
