import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, success } from '@/presentation/helpers'
import { LoadUserByIdController } from '@/presentation/controllers/user'
import { ValidationStub } from '@/tests/validation/mocks'
import { LoadUserByIdStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: LoadUserByIdController
  validationStub: ValidationStub
  loadUserStub: LoadUserByIdStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const loadUserStub = new LoadUserByIdStub()
  const sut = new LoadUserByIdController(validationStub, loadUserStub)
  return {
    sut,
    validationStub,
    loadUserStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    user_id: 1,
  },
})

describe('LoadUserByIdController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call LoadUser with correct values', async () => {
    const { sut, loadUserStub } = makeSut()
    const LoadUserSpy = jest.spyOn(loadUserStub, 'load')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(LoadUserSpy).toHaveBeenCalledWith({
      user_id: request.params.user_id,
    })
  })

  it('Should return 200 on success', async () => {
    const { sut, loadUserStub } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(success(loadUserStub.result))
  })
})
