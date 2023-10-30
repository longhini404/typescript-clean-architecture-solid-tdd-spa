import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { success, badRequest } from '@/presentation/helpers'
import { CreateTaskController } from '@/presentation/controllers/task'
import { ValidationStub } from '@/tests/validation/mocks'
import { CreateTaskStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: CreateTaskController
  validationStub: ValidationStub
  createTaskStub: CreateTaskStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const createTaskStub = new CreateTaskStub()
  const sut = new CreateTaskController(validationStub, createTaskStub)
  return {
    sut,
    validationStub,
    createTaskStub,
  }
}

const fakeTask = {
  title: 'Sample Task',
  description: 'A sample task description.',
  dateTime: '2023-10-30T08:00:00',
  duration: '2 hours',
}

const makeFakeRequest = (): HttpRequest => ({
  body: fakeTask,
})

describe('CreateTaskController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call CreateTask with correct values', async () => {
    const { sut, createTaskStub } = makeSut()
    const createTaskSpy = jest.spyOn(createTaskStub, 'create')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(createTaskSpy).toHaveBeenCalledWith(fakeTask)
  })

  it('Should return 200 on success', async () => {
    const { sut, createTaskStub } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(
      success({
        id: createTaskStub.result.id,
      })
    )
  })
})
