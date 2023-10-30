import { Controller } from '@/presentation/protocols'
import { LoadUserByIdController } from '@/presentation/controllers/user'
import { PostgresUserRepository } from '@/infra/db/postgres/repositories'
import { makeLoadUserByIdValidation } from '@/main/factories/validation/index'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { LoadUserByIdService } from '@/data/services/user'

export const makeLoadUserByIdController = (): Controller => {
  const postgresUserRepository = new PostgresUserRepository()
  const loadUserByIdService = new LoadUserByIdService(postgresUserRepository)
  const loadUserByIdController = new LoadUserByIdController(
    makeLoadUserByIdValidation(),
    loadUserByIdService
  )
  return makePerformanceMonitorDecorator('GET /api/user/load/:user_id', loadUserByIdController)
}
