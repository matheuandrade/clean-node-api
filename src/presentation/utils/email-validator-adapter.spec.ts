import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', async () => {
    const sut = new EmailValidatorAdapter()

    const isValid = sut.isValid('invalid-email')

    expect(isValid).toBe(false)
  })
})
