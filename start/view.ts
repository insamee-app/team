import View from '@ioc:Adonis/Core/View'
import { ReasonType } from 'App/Enums/ReasonType'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'
import User from 'App/Models/User'

View.global('UserRole', UserRole)
View.global('UserRoleData', [
  {
    id: UserRole.SuperAdmin,
    name: 'Super Admin',
    controller: 'UsersRolesController.makeSuperAdmin',
  },
  {
    id: UserRole.Admin,
    name: 'Admin',
    controller: 'UsersRolesController.makeAdmin',
  },
  {
    id: UserRole.Moderator,
    name: 'Modérateur',
    controller: 'UsersRolesController.makeModerator',
  },
  {
    id: UserRole.SuperSupervisor,
    name: 'Super Responsable',
    controller: 'UsersRolesController.makeSuperSupervisor',
  },
  {
    id: UserRole.SuperAssociativeManager,
    name: 'Super Responsable Associatif',
    controller: 'UsersRolesController.makeSuperAssociativeManager',
  },
  {
    id: UserRole.SuperEventsManager,
    name: 'Super Responsable Événements',
    controller: 'UsersRolesController.makeSuperEventsManager',
  },
  {
    id: UserRole.Supervisor,
    name: 'Responsable',
    controller: 'UsersRolesController.makeSupervisor',
  },
  {
    id: UserRole.AssociativeManager,
    name: 'Responsable Associatif',
    controller: 'UsersRolesController.makeAssociativeManager',
  },
  {
    id: UserRole.EventsManager,
    name: 'Responsable Événements',
    controller: 'UsersRolesController.makeEventsManager',
  },
  {
    id: UserRole.EventsCreator,
    name: 'Créateur Événements',
    controller: 'UsersRolesController.makeEventsCreator',
  },
  {
    id: UserRole.Member,
    name: 'Membre',
    controller: 'UsersRolesController.makeMember',
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
