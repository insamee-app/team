declare module '@ioc:Adonis/Core/Validator' {
  import { Rule } from '@ioc:Adonis/Core/Validator'
  import validator from 'validator'

  export interface Rules {
    userActive(): Rule
  }
}
