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
}).middleware('auth')
