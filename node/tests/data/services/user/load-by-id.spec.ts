import { LoadUserByIdService } from '@/data/services/user'
import { UserNotFoundError } from '@/domain/errors/user'
import { LoadUserByIdRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: LoadUserByIdService
  loadUserByIdRepositoryStub: LoadUserByIdRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = new LoadUserByIdRepositoryStub()
  const sut = new LoadUserByIdService(loadUserByIdRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  user_id: 1,
})

describe('loadUser Service', () => {
  it('Should call LoadUserById with correct value', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadUserByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.load(makeFakeRequest)
    expect(loadUserByIdSpy).toHaveBeenCalledWith({
      id: makeFakeRequest.user_id,
    })
  })
  it('Should throw if user is not found', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.load(makeFakeRequest)
    await expect(promise).rejects.toThrow(new UserNotFoundError())
  })
})
