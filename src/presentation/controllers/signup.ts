import { badRequest } from '../helpers/http-helper'
import { MissingParamError } from './../errors/missing-param-errors'
import { HttpRequest, HttpResponse } from './../protocols/http'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const reqeuiredFields = ['name', 'email']

    for (const field of reqeuiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
