import { EmailValidator } from './../protocols/emailValidator'
import { Controller } from './../protocols/controller'
import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from './../errors/missing-param-errors'
import { HttpRequest, HttpResponse } from './../protocols/http'
import { InvalidParamError } from '../errors/invalid-param-errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError('email'))
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
