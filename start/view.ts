import View from '@ioc:Adonis/Core/View'
import { ReasonType } from 'App/Enums/ReasonType'
import { TutoratKind } from 'App/Enums/TutoratKind'
import { TutoratStatus } from 'App/Enums/TutoratStatus'
import { TutoratType } from 'App/Enums/TutoratType'
import { TutoratProfileState } from 'App/Enums/TutoratProfileState'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import { EventType } from 'App/Enums/EventType'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import { EventProfileState } from 'App/Enums/EventProfileState'
import { DateTime } from 'luxon'
import { EventStatus } from 'App/Enums/EventStatus'

View.global('UserRole', UserRole)
View.global('UserRoleData', [
  {
    id: UserRole.SuperAdmin,
    name: 'Super Admin',
    controller: 'UsersRolesController.makeSuperAdmin',
    policy: 'UserRolePolicy.makeSuperAdmin',
  },
  {
    id: UserRole.Admin,
    name: 'Admin',
    controller: 'UsersRolesController.makeAdmin',
    policy: 'UserRolePolicy.makeAdmin',
  },
  {
    id: UserRole.Moderator,
    name: 'Modérateur',
    controller: 'UsersRolesController.makeModerator',
    policy: 'UserRolePolicy.makeModerator',
  },
  {
    id: UserRole.SuperSupervisor,
    name: 'Super Responsable',
    controller: 'UsersRolesController.makeSuperSupervisor',
    policy: 'UserRolePolicy.makeSuperSupervisor',
  },
  {
    id: UserRole.SuperAssociativeManager,
    name: 'Super Responsable Associatif',
    controller: 'UsersRolesController.makeSuperAssociativeManager',
    policy: 'UserRolePolicy.makeSuperAssociativeManager',
  },
  {
    id: UserRole.SuperEventsManager,
    name: 'Super Responsable Événements',
    controller: 'UsersRolesController.makeSuperEventsManager',
    policy: 'UserRolePolicy.makeSuperEventsManager',
  },
  {
    id: UserRole.Supervisor,
    name: 'Responsable',
    controller: 'UsersRolesController.makeSupervisor',
    policy: 'UserRolePolicy.makeSupervisor',
  },
  {
    id: UserRole.AssociativeManager,
    name: 'Responsable Associatif',
    controller: 'UsersRolesController.makeAssociativeManager',
    policy: 'UserRolePolicy.makeAssociativeManager',
  },
  {
    id: UserRole.EventsManager,
    name: 'Responsable Événements',
    controller: 'UsersRolesController.makeEventsManager',
    policy: 'UserRolePolicy.makeEventsManager',
  },
  {
    id: UserRole.EventsCreator,
    name: 'Créateur Événements',
    controller: 'UsersRolesController.makeEventsCreator',
    policy: 'UserRolePolicy.makeEventsCreator',
  },
  {
    id: UserRole.Member,
    name: 'Membre',
    controller: 'UsersRolesController.makeMember',
    policy: 'UserRolePolicy.makeMember',
  },
])
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
View.global('EventTypeData', [
  {
    id: String(EventType['InPerson']),
    name: 'En présence',
  },
  {
    id: String(EventType['Online']),
    name: 'A distance',
  },
])
View.global('EventStatus', EventStatus)
View.global('EventStatusData', [
  {
    id: String(EventStatus['Published']),
    name: 'Publié',
  },
  {
    id: String(EventStatus['Cancelled']),
    name: 'Annulé',
  },
])
View.global('TutoratProfileState', TutoratProfileState)
View.global('TutoratKind', TutoratKind)
View.global('TutoratTypeData', [
  {
    id: String(TutoratType['Online']),
    name: 'En ligne',
  },
  {
    id: String(TutoratType['InPerson']),
    name: 'En présence',
  },
])
View.global('TutoratStatus', TutoratStatus)
View.global('TutoratStatusData', [
  {
    id: String(TutoratStatus['Published']),
    name: 'Publié',
  },
  {
    id: String(TutoratStatus['Cancelled']),
    name: 'Annulé',
  },
])
View.global('TutoratKindData', [
  {
    id: String(TutoratKind['Offer']),
    name: 'Offre',
  },
  {
    id: String(TutoratKind['Demand']),
    name: 'Demande',
  },
])

View.global('loadCurrentProfile', async function (user: User) {
  await user.load('profile')
})

View.global('routesTeam', [
  {
    name: 'TutoratsController.index',
    filters: (profile?: Profile) => {
      if (!profile) return {}

      return {
        'schools[]': profile.schoolId,
        'date': DateTime.local().toFormat('yyyy-MM-dd'),
      }
    },
    title: 'Tutorat',
    asset: 'logo_tutorat.png',
    color: 'text-tutorat-primary-base',
  },
  {
    name: 'EventsController.index',
    filters: (profile?: Profile) => {
      if (!profile) return {}
      // Default filters get events for current user profile and after today
      return {
        'hosts[]': profile.schoolId,
        'date': DateTime.local().toFormat('yyyy-MM-dd'),
      }
    },
    title: 'Évènements',
    asset: 'logo_evenements.png',
    color: 'text-evenements-primary-base',
  },
  {
    name: 'AssociationsController.index',
    filters: (profile?: Profile) => {
      if (!profile) return {}
      // Default filters get associations for current user profile
      return {
        'schools[]': profile.schoolId,
      }
    },
    title: 'Associations',
    asset: 'logo_associations.png',
    color: 'text-associations-primary-base',
  },
  {
    name: 'ProfilesController.index',
    filters: () => {},
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
    name: 'SubjectsController.index',
    title: 'Matières',
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
