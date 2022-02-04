import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('associations', 'AssociationsController')

  Route.get('associations/:id/pictures/edit', 'AssociationsPicturesController.edit')
  Route.put('associations/:id/pictures', 'AssociationsPicturesController.update')
  Route.delete('associations/:id/pictures', 'AssociationsPicturesController.destroy')

  Route.get('associations/:id/reports/create', 'ReportsAssociationsController.create')
  Route.post('associations/:id/reports', 'ReportsController.store')
}).middleware('auth')
