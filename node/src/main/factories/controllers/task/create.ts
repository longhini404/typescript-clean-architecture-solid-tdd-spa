import { Controller } from '@/presentation/protocols'
import { CreateTaskController } from '@/presentation/controllers/task'
import { PostgresTaskRepository } from '@/infra/db/postgres/repositories'
import { CreateTaskService } from '@/data/services/task'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { makeCreateTaskValidation } from '../../validation/task'

export const makeCreateTaskController = (): Controller => {
  const postgresTaskRepository = new PostgresTaskRepository()
  const createTaskService = new CreateTaskService(
    postgresTaskRepository,
    postgresTaskRepository
  )
  const createTaskController = new CreateTaskController(
    makeCreateTaskValidation(),
    createTaskService
  )
  return makePerformanceMonitorDecorator('POST /api/task/create', createTaskController)
}
