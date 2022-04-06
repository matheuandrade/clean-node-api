import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', async () => {
    const sut = makeSut()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid-email')

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', async () => {
    const sut = makeSut()

    const isValid = sut.isValid('valid@email.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', async () => {
    const sut = makeSut()

    const isEmailSpy = jest.spyOn(validator, 'isEmail')

    sut.isValid('email')

    expect(isEmailSpy).toHaveBeenCalledWith('email')
  })
})
