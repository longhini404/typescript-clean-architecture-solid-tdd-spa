import { Decrypter } from '@/data/protocols/cryptography'
import { VerifyToken } from '@/domain/usecases/authentication'

export class VerifyTokenService implements VerifyToken {
  constructor(private readonly decrypter: Decrypter) {}

  async verify({ token }: VerifyToken.Params): Promise<VerifyToken.Result> {
    const accessToken = await this.decrypter.decrypt({
      token,
    })
    if (!accessToken) {
      return null
    }
    return {
      email: accessToken.login,
    }
  }
}
