import { serverError } from './../helpers/http-helper'
import { EmailValidator, Controller, HttpRequest, HttpResponse } from './../protocols'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError, InvalidParamError } from './../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { password, email, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: httpRequest.body
      }
    } catch (error) {
      return serverError()
    }
  }
}
