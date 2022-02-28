import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('schools', 'SchoolsController')

  Route.get('schools/:id/banners/edit', 'SchoolsBannersController.edit')
  Route.put('schools/:id/banners', 'SchoolsBannersController.update')
  Route.delete('schools/:id/banners', 'SchoolsBannersController.destroy')

  Route.get('schools/:id/reports/create', 'ReportsSchoolsController.create')
  Route.post('schools/:id/reports', 'ReportsSchoolsController.store')
}).middleware('auth')
