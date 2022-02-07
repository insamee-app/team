import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('reports', 'ReportsController').only(['index', 'show', 'update'])
}).middleware('auth')
