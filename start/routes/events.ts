import Route from '@ioc:Adonis/Core/Route'

Route.get('/events/home', ({ view }) => {
  return view.render('pages/events/home')
})

Route.get('/events', 'EventsController.index')

Route.group(() => {
  Route.resource('events', 'EventsController').only([
    'create',
    'store',
    'show',
    'edit',
    'update',
    'destroy',
  ])

  Route.get('events/:id/images/edit', 'EventsImagesController.edit')
  Route.put('events/:id/images', 'EventsImagesController.update')
  Route.delete('events/:id/images', 'EventsImagesController.destroy')

  Route.get('events/:id/reports/create', 'ReportsEventsController.create')
  Route.post('events/:id/reports', 'ReportsEventsController.store')
}).middleware('auth')
