import { Controller } from '@/presentation/protocols'
import { LoadTaskByIdController } from '@/presentation/controllers/task'
import { PostgresTaskRepository } from '@/infra/db/postgres/repositories'
import { LoadTaskByIdService } from '@/data/services/task'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { makeLoadTaskByIdValidation } from '../../validation/task'

export const makeLoadTaskByIdController = (): Controller => {
  const postgresTaskRepository = new PostgresTaskRepository()
  const loadTaskByIdService = new LoadTaskByIdService(postgresTaskRepository)
  const loadTaskByIdController = new LoadTaskByIdController(
    makeLoadTaskByIdValidation(),
    loadTaskByIdService
  )
  return makePerformanceMonitorDecorator(
    'GET /api/task/load/:task_id',
    loadTaskByIdController
  )
}
