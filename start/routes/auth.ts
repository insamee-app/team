import Route from '@ioc:Adonis/Core/Route'

Route.get('login', 'AuthController.showLoginForm')
Route.post('login', 'AuthController.login')

Route.get('register', 'AuthController.showRegisterForm')
Route.post('register', 'AuthController.register')

Route.delete('logout', 'AuthController.logout')

Route.get('send-verify-email', 'AuthController.showSendVerifyEmailForm')
Route.post('send-verify-email', 'AuthController.sendVerifyEmail')

Route.get('send-reset-password', 'AuthController.showSendResetPasswordForm')
Route.post('send-reset-password', 'AuthController.sendResetPassword')

Route.get('change-password/:user_id', 'AuthController.showChangePasswordForm')
Route.post('change-password/:user_id', 'AuthController.changePassword')

Route.get('users/:id/verification', 'AuthController.validateUser')
