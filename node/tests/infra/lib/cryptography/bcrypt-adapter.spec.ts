import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/lib/cryptography'

jest.mock('bcrypt', () => ({
  async compare(): Promise<boolean> {
    return true
  },
  async hash(): Promise<string> {
    return 'any_hash'
  },
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter()
}

describe('Bcrypt Adapter', () => {
  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare({
        incoming_password: 'any_value',
        storaged_password: 'any_hash',
      })
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare({
        incoming_password: 'any_value',
        storaged_password: 'any_hash',
      })
      expect(isValid).toBe(true)
    })

    test('Should return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const isValid = await sut.compare({
        incoming_password: 'any_value',
        storaged_password: 'any_hash',
      })
      expect(isValid).toBe(false)
    })

    test('Should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.compare({
        incoming_password: 'any_value',
        storaged_password: 'any_hash',
      })
      await expect(promise).rejects.toThrow()
    })

    test('Should return a hashed password', async () => {
      const sut = makeSut()
      const hash = await sut.hash({
        password: 'any_password',
      })
      expect(hash).toBe('any_hash')
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.hash({
        password: 'any_password',
      })
      await expect(promise).rejects.toThrow()
    })
  })
})
