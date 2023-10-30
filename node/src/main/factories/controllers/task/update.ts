import { Controller } from '@/presentation/protocols'
import { UpdateTaskController } from '@/presentation/controllers/task'
import { PostgresTaskRepository } from '@/infra/db/postgres/repositories'
import { UpdateTaskService } from '@/data/services/task'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { makeUpdateTaskValidation } from '../../validation/task'

export const makeUpdateTaskController = (): Controller => {
  const postgresTaskRepository = new PostgresTaskRepository()
  const updateTaskService = new UpdateTaskService(
    postgresTaskRepository,
    postgresTaskRepository
  )
  const updateTaskController = new UpdateTaskController(
    makeUpdateTaskValidation(),
    updateTaskService
  )
  return makePerformanceMonitorDecorator(
    'POST /api/task/update/:task_id',
    updateTaskController
  )
}
