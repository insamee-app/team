import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/', 'UsersController.index')
  Route.get('users/:id', 'UsersController.show')
  Route.delete('users/:id', 'UsersController.destroy')
  Route.put('users/:id/block', 'UsersController.block')
  Route.delete('users/:id/block', 'UsersController.unblock')

  Route.put('users/:id/member', 'UsersRolesController.makeMember')
  Route.put('users/:id/events-creator', 'UsersRolesController.makeEventsCreator')
  Route.put('users/:id/events-manager', 'UsersRolesController.makeEventsManager')
  Route.put('users/:id/super-events-manager', 'UsersRolesController.makeSuperEventsManager')
  Route.put('users/:id/associative-manager', 'UsersRolesController.makeAssociativeManager')
  Route.put(
    'users/:id/super-associative-manager',
    'UsersRolesController.makeSuperAssociativeManager'
  )
  Route.put('users/:id/supervisor', 'UsersRolesController.makeSupervisor')
  Route.put('users/:id/super-superviseur', 'UsersRolesController.makeSuperSupervisor')
  Route.put('users/:id/moderator', 'UsersRolesController.makeModerator')
  Route.put('users/:id/admin', 'UsersRolesController.makeAdmin')
  Route.put('users/:id/super-admin', 'UsersRolesController.makeSuperAdmin')
}).middleware('auth')
