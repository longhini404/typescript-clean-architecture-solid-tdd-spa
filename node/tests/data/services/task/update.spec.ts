import { UpdateTaskService } from '@/data/services/task'
import { TaskNotFoundError } from '@/domain/errors/task'
import { LoadTaskByIdRepositoryStub, UpdateTaskRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: UpdateTaskService
  loadTaskByIdRepositoryStub: LoadTaskByIdRepositoryStub
  updateTaskRepositoryStub: UpdateTaskRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadTaskByIdRepositoryStub = new LoadTaskByIdRepositoryStub()
  const updateTaskRepositoryStub = new UpdateTaskRepositoryStub()
  const sut = new UpdateTaskService(loadTaskByIdRepositoryStub, updateTaskRepositoryStub)
  return {
    sut,
    loadTaskByIdRepositoryStub,
    updateTaskRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  task_id: 1,
  information_to_update: {
    title: 'Sample Task',
    description: 'A sample task description.',
    dateTime: '2023-10-30T08:00:00',
    duration: '2 hours',
  },
})

describe('UpdateTask Service', () => {
  it('Should call LoadTaskById with correct value', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadTaskByIdSpy = jest.spyOn(loadTaskByIdRepositoryStub, 'loadById')
    await sut.update(makeFakeRequest)
    expect(loadTaskByIdSpy).toHaveBeenCalledWith({
      id: makeFakeRequest.task_id,
    })
  })

  it('Should call UpdateTask with correct value', async () => {
    const { sut, updateTaskRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const updateTaskSpy = jest.spyOn(updateTaskRepositoryStub, 'update')
    await sut.update(makeFakeRequest)
    expect(updateTaskSpy).toHaveBeenCalledWith({
      task_id: makeFakeRequest.task_id,
      information_to_update: makeFakeRequest.information_to_update,
    })
  })

  it('Should throw if task is not found', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.update(makeFakeRequest)
    await expect(promise).rejects.toThrow(new TaskNotFoundError())
  })
})
