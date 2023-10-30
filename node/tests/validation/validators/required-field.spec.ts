import { MissingParamError } from '@/domain/errors/generic'
import { RequiredFieldValidation } from '@/validation/validators'

let value: string

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  beforeEach(() => {
    value = 'any_value'
  })

  it('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ wrong_field: value })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not return if validation succeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: value })
    expect(error).toBeFalsy()
  })
})
