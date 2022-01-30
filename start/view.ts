import View from '@ioc:Adonis/Core/View'

View.global('routesTeam', [
  {
    name: 'TutoratsController.index',
    title: 'Tutorat',
    asset: 'logo_tutorat.png',
    color: 'text-tutorat-primary-base',
  },
  {
    name: 'EventsController.index',
    title: 'Évènements',
    asset: 'logo_evenements.png',
    color: 'text-evenements-primary-base',
  },
  {
    name: 'AssociationsController.index',
    title: 'Associations',
    asset: 'logo_associations.png',
    color: 'text-associations-primary-base',
  },
  {
    name: 'ProfilesController.index',
    title: 'Mee',
    asset: 'logo_mee.png',
    color: 'text-mee-primary-base',
  },
])
