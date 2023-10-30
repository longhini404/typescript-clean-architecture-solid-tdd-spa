import { VerifyTokenService } from '@/data/services/authentication'
import { DecrypterStub } from '@/tests/data/mocks'

let token

interface SutTypes {
  sut: VerifyTokenService
  decrypterStub: DecrypterStub
}

const makeSut = (): SutTypes => {
  const decrypterStub = new DecrypterStub()
  const sut = new VerifyTokenService(decrypterStub)
  return {
    sut,
    decrypterStub,
  }
}

describe('VerifyTokenService', () => {
  beforeEach(() => {
    token = 'any_token'
  })

  it('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.verify({ token })
    expect(decrypterSpy).toHaveBeenCalledWith({ token })
  })

  it('Should return correct value on Decrypt', async () => {
    const { sut, decrypterStub } = makeSut()
    await sut.verify({ token })
    expect(decrypterStub.token).toBeTruthy()
  })

  it('Should return null when Decrypt returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(null)
    const httpResponse = await sut.verify({ token })
    expect(httpResponse).toBeNull()
  })

  it('Should return error when Decrypter throw', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockRejectedValueOnce(() => {
      throw new Error()
    })
    const promise = sut.verify({ token })
    await expect(promise).rejects.toThrow()
  })
})
