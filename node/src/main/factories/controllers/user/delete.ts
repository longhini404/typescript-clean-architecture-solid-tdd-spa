import { Controller } from '@/presentation/protocols'
import { DeleteUserController } from '@/presentation/controllers/user'
import { PostgresUserRepository } from '@/infra/db/postgres/repositories'
import { makeDeleteUserValidation } from '@/main/factories/validation/index'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { DeleteUserService } from '@/data/services/user'

export const makeDeleteUserController = (): Controller => {
  const postgresUserRepository = new PostgresUserRepository()
  const deleteUserService = new DeleteUserService(postgresUserRepository, postgresUserRepository)
  const deleteUserController = new DeleteUserController(
    makeDeleteUserValidation(),
    deleteUserService
  )
  return makePerformanceMonitorDecorator('DELETE /api/user/delete/:id', deleteUserController)
}
