import { CreateTaskService } from '@/data/services/task/create'
import { TaskAlreadyRegisteredError } from '@/domain/errors/task'
import { LoadTaskByTitleRepositoryStub, CreateTaskRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: CreateTaskService
  loadTaskByTitleRepositoryStub: LoadTaskByTitleRepositoryStub
  createTaskRepositoryStub: CreateTaskRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadTaskByTitleRepositoryStub = new LoadTaskByTitleRepositoryStub()
  const createTaskRepositoryStub = new CreateTaskRepositoryStub()
  const sut = new CreateTaskService(createTaskRepositoryStub, loadTaskByTitleRepositoryStub)
  return {
    sut,
    loadTaskByTitleRepositoryStub,
    createTaskRepositoryStub,
  }
}

export const makeFakeTaskRequest = (): any => ({
  title: 'Sample Task',
  description: 'A sample task description.',
  dateTime: '2023-10-30T08:00:00',
  duration: '2 hours',
})

describe('CreateTask Service', () => {
  it('Should call LoadTaskByTitle with correct value', async () => {
    const { sut, loadTaskByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByTitleRepositoryStub, 'loadByTitle').mockResolvedValueOnce(null)
    const fakeTaskRequest = makeFakeTaskRequest()
    const loadTaskByTitleSpy = jest.spyOn(loadTaskByTitleRepositoryStub, 'loadByTitle')
    await sut.create(fakeTaskRequest)
    expect(loadTaskByTitleSpy).toHaveBeenCalledWith({
      title: fakeTaskRequest.title,
    })
  })

  it('Should call CreateTask with correct value', async () => {
    const { sut, createTaskRepositoryStub, loadTaskByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByTitleRepositoryStub, 'loadByTitle').mockResolvedValueOnce(null)
    const fakeTaskRequest = makeFakeTaskRequest()
    const createTaskSpy = jest.spyOn(createTaskRepositoryStub, 'create')
    await sut.create(fakeTaskRequest)
    expect(createTaskSpy).toHaveBeenCalledWith(fakeTaskRequest)
  })

  it('Should return correct value on CreateTask', async () => {
    const { sut, createTaskRepositoryStub, loadTaskByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByTitleRepositoryStub, 'loadByTitle').mockResolvedValueOnce(null)
    const fakeTaskRequest = makeFakeTaskRequest()
    const createdTask = await sut.create(fakeTaskRequest)
    expect(createdTask).toEqual({ id: createTaskRepositoryStub.result })
  })

  it('Should throw error when LoadTaskByTitleRepository returns a task', async () => {
    const { sut, loadTaskByTitleRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByTitleRepositoryStub, 'loadByTitle').mockResolvedValueOnce({
      title: 'Sample Task',
      description: 'A sample task description.',
      dateTime: '2023-10-30T08:00:00',
      duration: '2 hours',
    })
    const fakeTaskRequest = makeFakeTaskRequest()
    const promise = sut.create(fakeTaskRequest)
    expect(promise).rejects.toThrow(new TaskAlreadyRegisteredError())
  })
})
