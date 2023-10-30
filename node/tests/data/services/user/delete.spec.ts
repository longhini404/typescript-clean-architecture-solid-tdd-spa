import { DeleteUserService } from '@/data/services/user'
import { UserNotFoundError } from '@/domain/errors/user'
import { LoadUserByIdRepositoryStub, DeleteUserRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: DeleteUserService
  loadUserByIdRepositoryStub: LoadUserByIdRepositoryStub
  deleteUserRepositoryStub: DeleteUserRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = new LoadUserByIdRepositoryStub()
  const deleteUserRepositoryStub = new DeleteUserRepositoryStub()
  const sut = new DeleteUserService(loadUserByIdRepositoryStub, deleteUserRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub,
    deleteUserRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  user_id: 1,
})

describe('DeleteUser Service', () => {
  it('Should call LoadUserById with correct value', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadUserByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.delete(makeFakeRequest)
    expect(loadUserByIdSpy).toHaveBeenCalledWith({
      id: makeFakeRequest.user_id,
    })
  })

  it('Should call deleteUser with correct value', async () => {
    const { sut, deleteUserRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const deleteUserSpy = jest.spyOn(deleteUserRepositoryStub, 'delete')
    await sut.delete(makeFakeRequest)
    expect(deleteUserSpy).toHaveBeenCalledWith({
      user_id: makeFakeRequest.user_id,
    })
  })

  it('Should throw if user is not found', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.delete(makeFakeRequest)
    await expect(promise).rejects.toThrow(new UserNotFoundError())
  })
})
