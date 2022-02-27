import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/', 'UsersController.index')
  Route.get('users/:id', 'UsersController.show')
  Route.delete('users/:id', 'UsersController.destroy')
  Route.put('users/:id/block', 'UsersController.block')
  Route.delete('users/:id/block', 'UsersController.unblock')

  Route.put('users/:id/member', 'UsersRolesController.makeMember')
  Route.put('users/:id/eventcreator', 'UsersRolesController.makeEventCreator')
  Route.put('users/:id/eventmanager', 'UsersRolesController.makeEventManager')
  Route.put('users/:id/supereventmanager', 'UsersRolesController.makeSuperEventManager')
  Route.put('users/:id/associativemanager', 'UsersRolesController.makeAssociativeManager')
  Route.put('users/:id/superassociativemanager', 'UsersRolesController.makeSuperAssociativeManager')
  Route.put('users/:id/supervisor', 'UsersRolesController.makeSupervisor')
  Route.put('users/:id/supersupervisor', 'UsersRolesController.makeSuperSupervisor')
  Route.put('users/:id/moderator', 'UsersRolesController.makeModerator')
  Route.put('users/:id/admin', 'UsersRolesController.makeAdmin')
  Route.put('users/:id/superadmin', 'UsersRolesController.makeSuperAdmin')
}).middleware('auth')
