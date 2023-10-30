import { Controller } from '@/presentation/protocols'
import { DeleteTaskController } from '@/presentation/controllers/task'
import { PostgresTaskRepository } from '@/infra/db/postgres/repositories'
import { DeleteTaskService } from '@/data/services/task'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { makeDeleteTaskValidation } from '../../validation/task'

export const makeDeleteTaskController = (): Controller => {
  const postgresTaskRepository = new PostgresTaskRepository()
  const deleteTaskService = new DeleteTaskService(
    postgresTaskRepository,
    postgresTaskRepository
  )
  const deleteTaskController = new DeleteTaskController(
    makeDeleteTaskValidation(),
    deleteTaskService
  )
  return makePerformanceMonitorDecorator('DELETE /api/task/delete/:id', deleteTaskController)
}
