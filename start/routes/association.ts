import Route from '@ioc:Adonis/Core/Route'

Route.get('/associations/home', ({ view }) => {
  return view.render('pages/associations/home')
})

Route.get('/associations', 'AssociationsController.index')

Route.group(() => {
  Route.resource('associations', 'AssociationsController').only(['show', 'edit', 'update'])

  Route.get('associations/:id/pictures/edit', 'AssociationsPicturesController.edit')
  Route.put('associations/:id/pictures', 'AssociationsPicturesController.update')
  Route.delete('associations/:id/pictures', 'AssociationsPicturesController.destroy')

  Route.get('associations/:id/reports/create', 'ReportsAssociationsController.create')
  Route.post('associations/:id/reports', 'ReportsAssociationsController.store')
}).middleware('auth')
