import Route from '@ioc:Adonis/Core/Route'

Route.get('/mee/home', ({ view }) => {
  return view.render('pages/mee/home')
})

Route.get('/mee', 'ProfilesController.index')

Route.group(() => {
  Route.resource('mee', 'ProfilesController').only(['show', 'edit', 'update'])

  Route.get('mee/:id/avatars/edit', 'ProfilesAvatarsController.edit')
  Route.put('mee/:id/avatars', 'ProfilesAvatarsController.update')
  Route.delete('mee/:id/avatars', 'ProfilesAvatarsController.destroy')

  Route.get('mee/:id/reports/create', 'ReportsProfilesController.create')
  Route.post('mee/:id/reports', 'ReportsProfilesController.store')
}).middleware('auth')
