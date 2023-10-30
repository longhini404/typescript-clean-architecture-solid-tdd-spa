import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, success } from '@/presentation/helpers'
import { LoadTaskByIdController } from '@/presentation/controllers/task'
import { ValidationStub } from '@/tests/validation/mocks'
import { LoadTaskByIdStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: LoadTaskByIdController
  validationStub: ValidationStub
  loadTaskByIdStub: LoadTaskByIdStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const loadTaskByIdStub = new LoadTaskByIdStub()
  const sut = new LoadTaskByIdController(validationStub, loadTaskByIdStub)
  return {
    sut,
    validationStub,
    loadTaskByIdStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    task_id: 1,
  },
})

describe('LoadTaskByIdController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call LoadTaskById with correct values', async () => {
    const { sut, loadTaskByIdStub } = makeSut()
    const loadTaskByIdSpy = jest.spyOn(loadTaskByIdStub, 'load')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(loadTaskByIdSpy).toHaveBeenCalledWith({
      task_id: request.params.task_id,
    })
  })

  it('Should return 200 on success', async () => {
    const { sut, loadTaskByIdStub } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(success(loadTaskByIdStub.result))
  })
})
