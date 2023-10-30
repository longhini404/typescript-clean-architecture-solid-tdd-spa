import { MissingParamError } from '@/domain/errors/generic'
import { ValidationComposite } from '@/validation/validators'
import { ValidationSpy } from '@/tests/validation/mocks'

let value

type SutTypes = {
  sut: ValidationComposite
  validationSpys: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpys = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpys)
  return {
    sut,
    validationSpys,
  }
}

describe('Validation Composite', () => {
  beforeEach(() => {
    value = 'any_value'
  })

  it('Should return an error if any validation fails', () => {
    const { sut, validationSpys } = makeSut()
    jest.spyOn(validationSpys[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: value })
    expect(error).toEqual(new MissingParamError('field'))
  })

  it('Should not return if validation succeds', () => {
    const { sut } = makeSut()
    const error = sut.validate([])
    expect(error).toBeFalsy()
  })
})
