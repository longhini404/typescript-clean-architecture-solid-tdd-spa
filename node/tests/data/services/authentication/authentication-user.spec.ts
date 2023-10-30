import { AuthenticateUserService } from '@/data/services/authentication'
import { EncrypterStub, HashCompareStub, LoadUserByEmailRepositoryStub } from '@/tests/data/mocks'

let email: string, password: string

interface SutTypes {
  sut: AuthenticateUserService
  loadUserByEmailRepositoryStub: LoadUserByEmailRepositoryStub
  hashCompareStub: HashCompareStub
  encrypterStub: EncrypterStub
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = new LoadUserByEmailRepositoryStub()
  const hashCompareStub = new HashCompareStub()
  const encrypterStub = new EncrypterStub()
  const sut = new AuthenticateUserService(
    loadUserByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub
  )
  return {
    sut,
    loadUserByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
  }
}

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    email = 'any_email@anydomain.com'
    password = 'any_password'
  })

  it('Should call LoadUserByEmail with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadUserByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({ login: email, password: password })
    expect(loadUserByEmailSpy).toHaveBeenCalledWith({ email })
  })

  it('Should throw error when LoadUserByEmail returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const response = await sut.auth({ login: email, password: password })
    expect(response.access_token).toBeNull()
    expect(response.profile).toBeNull()
  })

  it('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub, loadUserByEmailRepositoryStub } = makeSut()
    const hashCompareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth({ login: email, password: password })
    expect(hashCompareSpy).toHaveBeenCalledWith({
      incoming_password: password,
      storaged_password: loadUserByEmailRepositoryStub.result.password,
    })
  })

  it('Should return null if HashCompare returns null', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(null)
    const response = await sut.auth({ login: email, password: password })
    expect(response.access_token).toBeNull()
    expect(response.profile).toBeNull()
  })

  it('Should call Encrypt with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth({ login: email, password: password })
    expect(encrypterSpy).toHaveBeenCalledWith({
      login: email,
    })
  })

  it('Should return correct value on success', async () => {
    const { sut, encrypterStub, loadUserByEmailRepositoryStub } = makeSut()
    const httpResponse = await sut.auth({ login: email, password: password })
    expect(httpResponse).toEqual({
      access_token: encrypterStub.result,
      profile: {
        name: loadUserByEmailRepositoryStub.result.name,
        email: loadUserByEmailRepositoryStub.result.email,
        cellphone: loadUserByEmailRepositoryStub.result.cellphone,
        avatar: loadUserByEmailRepositoryStub.result.avatar,
      },
    })
  })
})
