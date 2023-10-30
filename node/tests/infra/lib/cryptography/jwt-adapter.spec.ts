import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/lib/cryptography'

let token, id, secret, expires

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return token
  },

  async verify(): Promise<string> {
    return token
  },
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secret, expires)
}

describe('Jwt Adapter', () => {
  beforeEach(() => {
    id = 'any_id'
    token = 'any_token'
    secret = 'any_secret'
    expires = 90
  })

  describe('sign', () => {
    it('Should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(id)
      expect(signSpy).toHaveBeenCalledWith(id, secret, { expiresIn: expires })
    })

    it('Should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt(id)
      expect(accessToken).toBe(token)
    })

    it('Shoul throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt(id)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('decrypt', () => {
    it('Should call decrypt with correct values', async () => {
      const sut = makeSut()
      const decryptSpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt(id)
      expect(decryptSpy).toHaveBeenCalled()
    })

    it('Should return a token on verify success', async () => {
      const sut = makeSut()
      const accessToken = await sut.decrypt(id)
      expect(accessToken).toBe(token)
    })
  })
})
