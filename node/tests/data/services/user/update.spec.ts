import { UpdateUserService } from '@/data/services/user'
import { UserNotFoundError } from '@/domain/errors/user'
import { LoadUserByIdRepositoryStub, UpdateUserRepositoryStub } from '@/tests/data/mocks'

interface SutTypes {
  sut: UpdateUserService
  loadUserByIdRepositoryStub: LoadUserByIdRepositoryStub
  updateUserRepositoryStub: UpdateUserRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadUserByIdRepositoryStub = new LoadUserByIdRepositoryStub()
  const updateUserRepositoryStub = new UpdateUserRepositoryStub()
  const sut = new UpdateUserService(loadUserByIdRepositoryStub, updateUserRepositoryStub)
  return {
    sut,
    loadUserByIdRepositoryStub,
    updateUserRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  user_id: 1,
  informations_to_update: {
    name: 'any_name',
    email: 'any_email@anydomain.com',
    password: 'any_password',
    cellphone: '+99(99)999-999999',
    avatar: 'http://any_avatar',
    gender: 'M',
    status: 1,
  },
})

describe('UpdateUser Service', () => {
  it('Should call LoadUserById with correct value', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const loadUserByIdSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
    await sut.update(makeFakeRequest)
    expect(loadUserByIdSpy).toHaveBeenCalledWith({
      id: makeFakeRequest.user_id,
    })
  })

  it('Should call UpdateUser with correct value', async () => {
    const { sut, updateUserRepositoryStub } = makeSut()
    const makeFakeRequest = makeFakeRequestParams()
    const updateUserSpy = jest.spyOn(updateUserRepositoryStub, 'update')
    await sut.update(makeFakeRequest)
    expect(updateUserSpy).toHaveBeenCalledWith({
      user_id: makeFakeRequest.user_id,
      informations_to_update: makeFakeRequest.informations_to_update,
    })
  })

  it('Should throw if user is not found', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut()
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const promise = sut.update(makeFakeRequest)
    await expect(promise).rejects.toThrow(new UserNotFoundError())
  })
})
