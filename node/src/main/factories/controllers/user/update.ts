import { Controller } from '@/presentation/protocols'
import { UpdateUserController } from '@/presentation/controllers/user'
import { PostgresUserRepository } from '@/infra/db/postgres/repositories'
import { makeUpdateUserValidation } from '@/main/factories/validation/index'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { UpdateUserService } from '@/data/services/user'

export const makeUpdateUserController = (): Controller => {
  const postgresUserRepository = new PostgresUserRepository()
  const updateUserService = new UpdateUserService(postgresUserRepository, postgresUserRepository)
  const updateUserController = new UpdateUserController(
    makeUpdateUserValidation(),
    updateUserService
  )
  return makePerformanceMonitorDecorator('POST /api/user/update/:user_id', updateUserController)
}
