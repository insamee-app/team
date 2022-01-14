import Route from '@ioc:Adonis/Core/Route'

Route.get('login', 'AuthController.showLoginForm')
Route.post('login', 'AuthController.login')

Route.get('register', 'AuthController.showRegisterForm')
Route.post('register', 'AuthController.register')

Route.get('users/:id/verification', 'AuthController.validateUser')
