import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, noContent } from '@/presentation/helpers'
import { UpdateTaskController } from '@/presentation/controllers/task'
import { ValidationStub } from '@/tests/validation/mocks'
import { UpdateTaskStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: UpdateTaskController
  validationStub: ValidationStub
  updateTaskStub: UpdateTaskStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const updateTaskStub = new UpdateTaskStub()
  const sut = new UpdateTaskController(validationStub, updateTaskStub)
  return {
    sut,
    validationStub,
    updateTaskStub,
  }
}

const fakeTask = {
  title: 'Sample Task',
  description: 'A sample task description.',
  dateTime: '2023-10-30T08:00:00',
  duration: '2 hours',
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    task_id: 1,
  },
  body: fakeTask,
})

describe('UpdateTaskController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call updateTask with correct values', async () => {
    const { sut, updateTaskStub } = makeSut()
    const updateTaskSpy = jest.spyOn(updateTaskStub, 'update')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(updateTaskSpy).toHaveBeenCalledWith({
      task_id: request.params.task_id,
      information_to_update: request.body,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(noContent())
  })
})
