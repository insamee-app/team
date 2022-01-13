import Route from '@ioc:Adonis/Core/Route'

Route.get('register', 'AuthController.showRegisterForm')
Route.post('register', 'AuthController.register')
