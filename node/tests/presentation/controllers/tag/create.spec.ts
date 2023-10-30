import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { success, badRequest } from '@/presentation/helpers'
import { CreateTagController } from '@/presentation/controllers/tag'
import { ValidationStub } from '@/tests/validation/mocks'
import { CreateTagStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: CreateTagController
  validationStub: ValidationStub
  createTagStub: CreateTagStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const createTagStub = new CreateTagStub()
  const sut = new CreateTagController(validationStub, createTagStub)
  return {
    sut,
    validationStub,
    createTagStub,
  }
}

const fakeTag = {
  title: 'Sample Tag',
}

const makeFakeRequest = (): HttpRequest => ({
  body: fakeTag,
})

describe('CreateTagController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call CreateTag with correct values', async () => {
    const { sut, createTagStub } = makeSut()
    const createTagSpy = jest.spyOn(createTagStub, 'create')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(createTagSpy).toHaveBeenCalledWith(fakeTag)
  })

  it('Should return 200 on success', async () => {
    const { sut, createTagStub } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(
      success({
        id: createTagStub.result.id,
      })
    )
  })
})
