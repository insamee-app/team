import Route from '@ioc:Adonis/Core/Route'

Route.get('/tutoring/home', ({ view }) => {
  return view.render('pages/tutorat/home')
})

Route.get('/tutoring', 'TutoratsController.index')

Route.group(() => {
  Route.resource('tutoring', 'TutoratsController').only([
    'create',
    'store',
    'show',
    'edit',
    'update',
    'destroy',
  ])

  Route.get('tutoring/:id/reports/create', 'ReportsTutoratsController.create')
  Route.post('tutoring/:id/reports', 'ReportsTutoratsController.store')

  Route.post('tutoring/:id/interested', 'TutoratsInterestedController.store')
  Route.delete('tutoring/:id/interested', 'TutoratsInterestedController.destroy')

  Route.post('tutoring/:id/participate', 'TutoratsParticipateController.store')
  Route.delete('tutoring/:id/participate', 'TutoratsParticipateController.destroy')
}).middleware('auth')
