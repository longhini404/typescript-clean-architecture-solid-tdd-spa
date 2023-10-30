import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { unauthorized, success, badRequest } from '@/presentation/helpers'
import { LoginController } from '@/presentation/controllers/authentication'
import { ValidationStub } from '@/tests/validation/mocks'
import { AuthenticationStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: LoginController
  validationStub: ValidationStub
  authenticationStub: AuthenticationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationStub = new AuthenticationStub()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    login: 'any_login',
    password: 'any_password',
  },
})

describe('LoginController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(authSpy).toHaveBeenCalledWith({
      login: request.body.login,
      password: request.body.password,
    })
  })

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve({ access_token: null, profile: null })))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toStrictEqual(success(authenticationStub.result))
  })
})
