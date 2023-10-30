import { Controller } from '@/presentation/protocols'
import { ListUsersController } from '@/presentation/controllers/user'
import { PostgresUserRepository } from '@/infra/db/postgres/repositories'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { ListUsersService } from '@/data/services/user'

export const makeListUsersController = (): Controller => {
  const postgresUserRepository = new PostgresUserRepository()
  const listUsersService = new ListUsersService(postgresUserRepository)
  const listUsersController = new ListUsersController(listUsersService)
  return makePerformanceMonitorDecorator('GET /api/user/load/', listUsersController)
}
