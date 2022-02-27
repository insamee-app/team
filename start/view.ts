import View from '@ioc:Adonis/Core/View'
import { ReasonType } from 'App/Enums/ReasonType'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import { EventType } from 'App/Enums/EventType'
import User from 'App/Models/User'
import { EventProfileState } from 'App/Enums/EventProfileState'

View.global('UserRole', UserRole)
View.global('UserStatus', UserStatus)
View.global('EventProfileState', EventProfileState)
View.global('EventType', EventType)
View.global('ReasonTypeData', [
  {
    id: String(ReasonType['Profile']),
    name: 'Profil',
  },
  {
    id: String(ReasonType['Association']),
    name: 'Association',
  },
  {
    id: String(ReasonType['School']),
    name: 'Ecole',
  },
  {
    id: String(ReasonType['Event']),
    name: 'Événement',
  },
])
View.global('EventType', [
  {
    id: String(EventType['InPerson']),
    name: 'En présence',
  },
  {
    id: String(EventType['Online']),
    name: 'A distance',
  },
])

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
