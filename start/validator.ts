import { ValidationRuntimeOptions, validator } from '@ioc:Adonis/Core/Validator'
import { getSchoolByHost } from 'App/Services/school'

async function validateExistsHostSchool(
  value: string,
  _,
  { pointer, arrayExpressionPointer, errorReporter }: ValidationRuntimeOptions
) {
  /*
   * value is a valid email using another validator
   */

  /**
   * Skip validation when value is not a string. The string
   * schema rule will handle it
   */
  if (typeof value !== 'string') {
    return
  }

  const hostname = value.split('@')[1]
  const school = await getSchoolByHost(hostname)

  if (school) return

  errorReporter.report(pointer, 'existsHostSchool', 'Invalid school', arrayExpressionPointer)
  return
}

function compileSchool() {
  return {
    async: true,
  }
}

validator.rule('existsHostSchool', validateExistsHostSchool, compileSchool)
