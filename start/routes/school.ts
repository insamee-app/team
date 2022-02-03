import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('schools', 'SchoolsController')

  Route.get('schools/:id/banners/edit', 'SchoolsBannersController.edit')
  Route.put('schools/:id/banners', 'SchoolsBannersController.update')
  Route.delete('schools/:id/banners', 'SchoolsBannersController.destroy')
}).middleware('auth')
