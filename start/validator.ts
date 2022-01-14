import { ValidationRuntimeOptions, validator } from '@ioc:Adonis/Core/Validator'
import { UserStatus } from 'App/Enums/UserStatus'
import User from 'App/Models/User'

async function validateUserActive(
  value: string,
  _,
  { pointer, arrayExpressionPointer, errorReporter }: ValidationRuntimeOptions
) {
  /**
   * value is a valid email using another validator
   */

  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof value !== 'string') {
    return
  }

  /**
   * User is in database because of a check in exists rule
   */
  const user = await User.findBy('email', value)

  if (user?.status === UserStatus.Active) return

  errorReporter.report(pointer, 'userActive', 'User must be active', arrayExpressionPointer)
  return
}

function compileUserActive() {
  return {
    async: true,
  }
}

validator.rule('userActive', validateUserActive, compileUserActive)
