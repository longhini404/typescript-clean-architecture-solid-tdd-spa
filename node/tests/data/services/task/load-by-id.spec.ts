import { LoadTaskByIdService } from '@/data/services/task'
import { TaskNotFoundError } from '@/domain/errors/task'
import { LoadTaskByIdRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: LoadTaskByIdService
  loadTaskByIdRepositoryStub: LoadTaskByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadTaskByIdRepositoryStub = new LoadTaskByIdRepositoryStub()
  const sut = new LoadTaskByIdService(loadTaskByIdRepositoryStub)
  return {
    sut,
    loadTaskByIdRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  task_id: 1,
})

describe('LoadTaskById Service', () => {
  it('Should call LoadTaskById with correct value', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadTaskByIdSpy = jest.spyOn(loadTaskByIdRepositoryStub, 'loadById')
    await sut.load(makeFakeRequest)
    expect(loadTaskByIdSpy).toHaveBeenCalledWith({
      id: makeFakeRequest.task_id,
    })
  })

  it('Should throw if task is not found', async () => {
    const { sut, loadTaskByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTaskByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.load(makeFakeRequest)
    await expect(promise).rejects.toThrow(new TaskNotFoundError())
  })
})
