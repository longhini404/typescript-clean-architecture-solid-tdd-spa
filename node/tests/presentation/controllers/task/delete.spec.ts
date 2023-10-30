import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, noContent } from '@/presentation/helpers'
import { DeleteTaskController } from '@/presentation/controllers/task'
import { ValidationStub } from '@/tests/validation/mocks'
import { DeleteTaskStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DeleteTaskController
  validationStub: ValidationStub
  deleteTaskStub: DeleteTaskStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const deleteTaskStub = new DeleteTaskStub()
  const sut = new DeleteTaskController(validationStub, deleteTaskStub)
  return {
    sut,
    validationStub,
    deleteTaskStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    task_id: 1,
  },
})

describe('DeleteTaskController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call DeleteTask with correct values', async () => {
    const { sut, deleteTaskStub } = makeSut()
    const deleteTaskSpy = jest.spyOn(deleteTaskStub, 'delete')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(deleteTaskSpy).toHaveBeenCalledWith({
      task_id: request.params.task_id,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(noContent())
  })
})
