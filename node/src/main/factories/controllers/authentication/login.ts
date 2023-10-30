import { AuthenticateUserService } from '@/data/services/authentication'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/authentication'
import { JwtAdapter, BcryptAdapter } from '@/infra/lib/cryptography'
import { PostgresUserRepository } from '@/infra/db/postgres/repositories'
import config from '@/main/config/env'
import { makeLoginValidation } from '@/main/factories/validation/index'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'

export const makeLoginController = (): Controller => {
  const encrypter = new JwtAdapter(
    config.authentication.jwt_secret,
    config.authentication.expires_in
  )
  const bcrypt = new BcryptAdapter()
  const postgresUserRepository = new PostgresUserRepository()
  const authenticationService = new AuthenticateUserService(
    postgresUserRepository,
    bcrypt,
    encrypter
  )
  const loginController = new LoginController(makeLoginValidation(), authenticationService)
  return makePerformanceMonitorDecorator('POST /api/login', loginController)
}
