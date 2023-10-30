import jwt from 'jsonwebtoken'
import { Encrypter, Decrypter } from '@/data/protocols/cryptography'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string, private readonly token_expire: number) {}

  async encrypt(params: Encrypter.Params<any>): Promise<Encrypter.Result> {
    return jwt.sign(params, this.secret, { expiresIn: this.token_expire })
  }

  async decrypt(params: Decrypter.Params): Promise<Decrypter.Result> {
    return jwt.verify(params.token, this.secret)
  }
}
