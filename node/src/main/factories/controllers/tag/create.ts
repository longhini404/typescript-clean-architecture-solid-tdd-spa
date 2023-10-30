import { Controller } from '@/presentation/protocols'
import { CreateTagController } from '@/presentation/controllers/tag'
import { PostgresTagRepository } from '@/infra/db/postgres/repositories'
import { CreateTagService } from '@/data/services/tag'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { makeCreateTagValidation } from '../../validation/tag'

export const makeCreateTagController = (): Controller => {
  const postgresTagRepository = new PostgresTagRepository()
  const createTagService = new CreateTagService(postgresTagRepository, postgresTagRepository)
  const createTagController = new CreateTagController(makeCreateTagValidation(), createTagService)
  return makePerformanceMonitorDecorator('POST /api/tag/create', createTagController)
}
