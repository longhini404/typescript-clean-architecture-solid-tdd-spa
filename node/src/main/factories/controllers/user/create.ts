import { Controller } from '@/presentation/protocols'
import { CreateUserController } from '@/presentation/controllers/user'
import { BcryptAdapter } from '@/infra/lib/cryptography'
import { PostgresUserRepository } from '@/infra/db/postgres/repositories'
import { makeCreateUserValidation } from '@/main/factories/validation/index'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { CreateUserService } from '@/data/services/user'

export const makeCreateUserController = (): Controller => {
  const bcrypt = new BcryptAdapter()
  const postgresUserRepository = new PostgresUserRepository()
  const createUserService = new CreateUserService(
    postgresUserRepository,
    bcrypt,
    postgresUserRepository
  )
  const createUserController = new CreateUserController(
    makeCreateUserValidation(),
    createUserService
  )
  return makePerformanceMonitorDecorator('POST /api/user/create', createUserController)
}
