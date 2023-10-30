import { HttpRequest } from '@/presentation/protocols'
import { success } from '@/presentation/helpers'
import { ListUsersController } from '@/presentation/controllers/user'
import { ListUsersStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: ListUsersController
  listUsersStub: ListUsersStub
}

const makeSut = (): SutTypes => {
  const listUsersStub = new ListUsersStub()
  const sut = new ListUsersController(listUsersStub)
  return {
    sut,
    listUsersStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  query: {
    page: 1,
    items: 10,
  },
})

describe('ListUsersController', () => {
  it('Should call ListUsers with correct values', async () => {
    const { sut, listUsersStub } = makeSut()
    const ListUsersSpy = jest.spyOn(listUsersStub, 'load')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(ListUsersSpy).toHaveBeenCalledWith({
      page: request.query.page,
      items: request.query.items,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut, listUsersStub } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(
      success({
        users: listUsersStub.result.users,
        pagination: listUsersStub.result.pagination,
      })
    )
  })
  it('Should return noContent on success even without receiving pagination information', async () => {
    const { sut, listUsersStub } = makeSut()
    const httpRequest = await sut.handle({
      query: {},
    })
    expect(httpRequest).toEqual(
      success({
        users: listUsersStub.result.users,
        pagination: listUsersStub.result.pagination,
      })
    )
  })
})
