import { Decrypter, Encrypter, HashCompare } from '@/data/protocols/cryptography'

export class EncrypterStub implements Encrypter {
  result = 'any_token'

  async encrypt(params: Encrypter.Params<any>): Promise<Encrypter.Result> {
    return this.result
  }
}

export class DecrypterStub implements Decrypter {
  token = 'any_token'

  async decrypt(params: Decrypter.Params): Promise<Decrypter.Result> {
    return this.token
  }
}

export class HashCompareStub implements HashCompare {
  result = true

  async compare(params: HashCompare.Params): Promise<HashCompare.Result> {
    return this.result
  }
}
