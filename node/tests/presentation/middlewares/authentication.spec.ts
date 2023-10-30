import { AccessDeniedError } from '@/domain/errors/authentication'
import { forbidden, serverError } from '@/presentation/helpers'
import { AuthenticationMiddleware } from '@/presentation/middlewares'
import { VerifyTokenStub } from '@/tests/presentation/mocks'

let token

const makeFakeRequest = (): any => ({
  accessToken: `Bearer ${token}`,
})

const makeFakeFailRequest = (): any => ({
  accessToken: null,
})

interface SutTypes {
  sut: AuthenticationMiddleware
  verifyTokenStub: VerifyTokenStub
}

const makeSut = (): SutTypes => {
  const verifyTokenStub = new VerifyTokenStub()
  const sut = new AuthenticationMiddleware(verifyTokenStub)
  return {
    sut,
    verifyTokenStub,
  }
}

describe('Authentication Middleware', () => {
  beforeEach(() => {
    token = 'any_token'
  })

  it('Should return forbidden if token is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeFailRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should call verifyToken with correct value', async () => {
    const { sut, verifyTokenStub } = makeSut()
    const verifyTokenSpy = jest.spyOn(verifyTokenStub, 'verify')
    await sut.handle(makeFakeRequest())
    expect(verifyTokenSpy).toHaveBeenCalledWith({
      token,
    })
  })

  it('Should return forbidden if verifyToken fails', async () => {
    const { sut, verifyTokenStub } = makeSut()
    jest.spyOn(verifyTokenStub, 'verify').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  it('Should throw if verifyToken throws', async () => {
    const { sut, verifyTokenStub } = makeSut()
    jest.spyOn(verifyTokenStub, 'verify').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = await sut.handle(makeFakeRequest())
    expect(promise).toEqual(serverError(new Error()))
  })
})
