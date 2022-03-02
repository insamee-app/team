import View from '@ioc:Adonis/Core/View'
import { ReasonType } from 'App/Enums/ReasonType'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

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
View.global('ReasonType', ReasonType)
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
])

View.global('loadCurrentProfile', async function (user: User) {
  await user.load('profile')
})

View.global('routesTeam', [
  {
    name: 'TutoratsController.index',
    filters: () => {},
    title: 'Tutorat',
    asset: 'logo_tutorat.png',
    color: 'text-tutorat-primary-base',
  },
  {
    name: 'EventsController.index',
    filters: () => {},
    title: 'Évènements',
    asset: 'logo_evenements.png',
    color: 'text-evenements-primary-base',
  },
  {
    name: 'AssociationsController.index',
    filters: (profile?: Profile) => {
      if (!profile) return {}
      // Default filters get associations from current user profile
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
    name: 'ThematicsController.index',
    title: 'Thématiques',
  },
  {
    name: 'TagsController.index',
    title: 'Tags',
  },
])
