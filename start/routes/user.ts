import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('mee', 'ProfilesController').only(['show', 'edit', 'update'])

  Route.get('mee/:id/avatars/edit', 'ProfilesAvatarsController.edit')
  Route.put('mee/:id/avatars', 'ProfilesAvatarsController.update')
  Route.delete('mee/:id/avatars', 'ProfilesAvatarsController.destroy')
}).middleware('auth')
