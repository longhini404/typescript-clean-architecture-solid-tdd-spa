import { DeleteTaskService } from '@/data/services/task'
import { TaskNotFoundError } from '@/domain/errors/task'
import { LoadTaskByIdRepositoryStub, DeleteTaskRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: DeleteTaskService
  loadTaskByIdRepositoryStub: LoadTaskByIdRepositoryStub
  deleteTaskRepositoryStub: DeleteTaskRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadTaskByIdRepositoryStub = new LoadTaskByIdRepositoryStub()
  const deleteTaskRepositoryStub = new DeleteTaskRepositoryStub()
  const sut = new DeleteTaskService(loadTaskByIdRepositoryStub, deleteTaskRepositoryStub)
  return {
    sut,
    loadTaskByIdRepositoryStub,
    deleteTaskRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  id: 1,
})

describe('DeleteTask Service', () => {
  it('Should call LoadTaskById with correct value', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadTaskByIdSpy = jest.spyOn(loadTaskByIdRepositoryStub, 'loadById')
    await sut.delete(makeFakeRequest)
    expect(loadTaskByIdSpy).toHaveBeenCalledWith({
      task_id: makeFakeRequest.task_id,
    })
  })

  it('Should call deleteTask with correct value', async () => {
    const { sut, deleteTaskRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const deleteTaskSpy = jest.spyOn(deleteTaskRepositoryStub, 'delete')
    await sut.delete(makeFakeRequest)
    expect(deleteTaskSpy).toHaveBeenCalledWith({
      task_id: makeFakeRequest.task_id,
    })
  })

  it('Should throw if task is not found', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.delete(makeFakeRequest)
    await expect(promise).rejects.toThrow(new TaskNotFoundError())
  })
})
