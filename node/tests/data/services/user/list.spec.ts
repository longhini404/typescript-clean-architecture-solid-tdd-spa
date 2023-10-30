import { ListUsersService } from '@/data/services/user'
import { ListUsersRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: ListUsersService
  listUsersRepositoryStub: ListUsersRepositoryStub
}

const makeSut = (): SutTypes => {
  const listUsersRepositoryStub = new ListUsersRepositoryStub()
  const sut = new ListUsersService(listUsersRepositoryStub)
  return {
    sut,
    listUsersRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  page: 1,
  items: 10,
})

describe('ListUsers Service', () => {
  it('Should call ListUsers with correct value', async () => {
    const { sut, listUsersRepositoryStub } = makeSut()
    const listUsersSpy = jest.spyOn(listUsersRepositoryStub, 'load')
    const makeFakeRequest = makeFakeRequestParams()
    await sut.load(makeFakeRequest)
    expect(listUsersSpy).toHaveBeenCalledWith({
      page: makeFakeRequest.page,
      items: makeFakeRequest.items,
    })
  })
})
