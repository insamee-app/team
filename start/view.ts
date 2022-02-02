import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'

View.global('loadCurrentProfile', async function (user: User) {
  await user.load('profile')
})

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

View.global('routesExplorer', [
  {
    name: 'SkillsController.index',
    title: 'Compétences',
  },
  {
    name: 'FocusInterestsController.index',
    title: "Centres d'intérêts",
  },
  {
    name: 'ThematicsController.index',
    title: 'Thématiques',
  },
  {
    name: 'TagsController.index',
    title: 'Tags',
  },
])
