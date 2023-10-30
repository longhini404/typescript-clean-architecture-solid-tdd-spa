import { ListTasksService } from '@/data/services/task'
import { ListTasksRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: ListTasksService
  listTasksRepositoryStub: ListTasksRepositoryStub
}

const makeSut = (): SutTypes => {
  const listTasksRepositoryStub = new ListTasksRepositoryStub()
  const sut = new ListTasksService(listTasksRepositoryStub)
  return {
    sut,
    listTasksRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  page: 1,
  items: 10,
})

describe('ListTasks Service', () => {
  it('Should call ListTasks with correct value', async () => {
    const { sut, listTasksRepositoryStub } = makeSut()
    const listTasksSpy = jest.spyOn(listTasksRepositoryStub, 'load')
    const makeFakeRequest = makeFakeRequestParams()
    await sut.load(makeFakeRequest)
    expect(listTasksSpy).toHaveBeenCalledWith({
      page: makeFakeRequest.page,
      items: makeFakeRequest.items,
    })
  })
})
