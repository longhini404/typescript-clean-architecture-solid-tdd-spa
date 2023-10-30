import { HttpRequest } from '@/presentation/protocols'
import { success } from '@/presentation/helpers'
import { ListTasksController } from '@/presentation/controllers/task'
import { ListTasksStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: ListTasksController
  listTasksStub: ListTasksStub
}

const makeSut = (): SutTypes => {
  const listTasksStub = new ListTasksStub()
  const sut = new ListTasksController(listTasksStub)
  return {
    sut,
    listTasksStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  query: {
    page: 1,
    items: 10,
  },
})

describe('ListTasksController', () => {
  it('Should call ListTasks with correct values', async () => {
    const { sut, listTasksStub } = makeSut()
    const listTasksSpy = jest.spyOn(listTasksStub, 'load')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(listTasksSpy).toHaveBeenCalledWith({
      page: request.query.page,
      items: request.query.items,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut, listTasksStub } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(
      success({
        tasks: listTasksStub.result.tasks,
        pagination: listTasksStub.result.pagination,
      })
    )
  })

  it('Should return noContent on success even without receiving pagination information', async () => {
    const { sut, listTasksStub } = makeSut()
    const httpRequest = await sut.handle({
      query: {},
    })
    expect(httpRequest).toEqual(
      success({
        tasks: listTasksStub.result.tasks,
        pagination: listTasksStub.result.pagination,
      })
    )
  })
})
