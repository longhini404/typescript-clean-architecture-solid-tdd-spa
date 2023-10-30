import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, success } from '@/presentation/helpers'
import { LoadTagByIdController } from '@/presentation/controllers/tag'
import { ValidationStub } from '@/tests/validation/mocks'
import { LoadTagByIdStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: LoadTagByIdController
  validationStub: ValidationStub
  loadTagByIdStub: LoadTagByIdStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const loadTagByIdStub = new LoadTagByIdStub()
  const sut = new LoadTagByIdController(validationStub, loadTagByIdStub)
  return {
    sut,
    validationStub,
    loadTagByIdStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    tag_id: 1,
  },
})

describe('LoadTagByIdController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call LoadTagById with correct values', async () => {
    const { sut, loadTagByIdStub } = makeSut()
    const loadTagByIdSpy = jest.spyOn(loadTagByIdStub, 'load')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(loadTagByIdSpy).toHaveBeenCalledWith({
      tag_id: request.params.tag_id,
    })
  })

  it('Should return 200 on success', async () => {
    const { sut, loadTagByIdStub } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(success(loadTagByIdStub.result))
  })
})
