import { VerifyTokenService } from '@/data/services/authentication'
import { Middleware } from '@/presentation/protocols'
import { AuthenticationMiddleware } from '@/presentation/middlewares'
import { JwtAdapter } from '@/infra/lib/cryptography'
import config from '@/main/config/env'

export const makeAuthenticationMiddleware = (): Middleware => {
  const decrypter = new JwtAdapter(
    config.authentication.jwt_secret,
    config.authentication.expires_in
  )
  const verifyTokenService = new VerifyTokenService(decrypter)
  return new AuthenticationMiddleware(verifyTokenService)
}
