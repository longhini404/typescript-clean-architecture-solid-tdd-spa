import { Controller } from '@/presentation/protocols'
import { ListTasksController } from '@/presentation/controllers/task'
import { PostgresTaskRepository } from '@/infra/db/postgres/repositories'
import { ListTasksService } from '@/data/services/task'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'

export const makeListTasksController = (): Controller => {
  const postgresTaskRepository = new PostgresTaskRepository()
  const listTasksService = new ListTasksService(postgresTaskRepository)
  const listTasksController = new ListTasksController(listTasksService)
  return makePerformanceMonitorDecorator('GET /api/task/load/', listTasksController)
}
