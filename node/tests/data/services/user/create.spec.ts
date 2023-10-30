import { CreateUserService } from '@/data/services/user/create'
import { UserAlreadyRegisteredError } from '@/domain/errors/user'
import {
  LoadUserByEmailRepositoryStub,
  BcryptAdapterStub,
  CreateUserRepositoryStub,
} from '@/tests/data/mocks'

interface SutTypes {
  sut: CreateUserService
  loadUserByEmailRepositoryStub: LoadUserByEmailRepositoryStub
  bcryptAdapterStub: BcryptAdapterStub
  createUserRepositoryStub: CreateUserRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = new LoadUserByEmailRepositoryStub()
  const bcryptAdapterStub = new BcryptAdapterStub()
  const createUserRepositoryStub = new CreateUserRepositoryStub()
  const sut = new CreateUserService(
    loadUserByEmailRepositoryStub,
    bcryptAdapterStub,
    createUserRepositoryStub
  )
  return {
    sut,
    loadUserByEmailRepositoryStub,
    bcryptAdapterStub,
    createUserRepositoryStub,
  }
}

export const makeFakeRequestParams = (): any => ({
  name: 'any_name',
  email: 'any_email@anydomain.com',
  password: 'any_password',
  cellphone: '+99(99)999-999999',
  avatar: 'http://any_avatar',
  gender: 'M',
  status: 1,
})

describe('CreateUser Service', () => {
  it('Should call LoadUserByEmail with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const loadUserByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.create(makeFakeRequest)
    expect(loadUserByEmailSpy).toHaveBeenCalledWith({
      email: makeFakeRequest.email,
    })
  })

  it('Should call CreateUser with correct value', async () => {
    const { sut, createUserRepositoryStub, loadUserByEmailRepositoryStub, bcryptAdapterStub } =
      makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    const makeFakeRequest = makeFakeRequestParams()
    const createUserSpy = jest.spyOn(createUserRepositoryStub, 'create')
    await sut.create(makeFakeRequest)
    expect(createUserSpy).toHaveBeenCalledWith({
      name: makeFakeRequest.name,
      email: makeFakeRequest.email,
      password: bcryptAdapterStub.result,
      avatar: makeFakeRequest.avatar,
      status: makeFakeRequest.status,
      gender: makeFakeRequest.gender,
      cellphone: '9999999999999',
    })
  })

  it('Should return correct value on CreateUser', async () => {
    const { sut, createUserRepositoryStub, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    await sut.create(makeFakeRequestParams())
    expect(createUserRepositoryStub).toBeTruthy()
  })

  it('Should throw error when LoadAccountByEmail return a user', async () => {
    const { sut, loadUserByEmailRepositoryStub, createUserRepositoryStub } = makeSut()
    jest.spyOn(createUserRepositoryStub, 'create').mockRejectedValueOnce(() => {
      throw new UserAlreadyRegisteredError()
    })
    const makeFakeRequest = makeFakeRequestParams()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce({
      id: 1,
      name: 'any_name',
      email: 'any_email@anydomain.com',
      password: 'any_password',
      cellphone: '9999999999999',
      avatar: 'http://any_avatar',
      gender: 'M',
      status: 1,
    })
    const promise = sut.create(makeFakeRequest)
    expect(promise).rejects.toThrow(new UserAlreadyRegisteredError())
  })
})
