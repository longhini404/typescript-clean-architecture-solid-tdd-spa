import { Controller } from '@/presentation/protocols'
import { UpdateTagController } from '@/presentation/controllers/tag'
import { PostgresTagRepository } from '@/infra/db/postgres/repositories'
import { UpdateTagService } from '@/data/services/tag'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { makeUpdateTagValidation } from '../../validation/tag'

export const makeUpdateTagController = (): Controller => {
  const postgresTagRepository = new PostgresTagRepository()
  const updateTagService = new UpdateTagService(postgresTagRepository, postgresTagRepository)
  const updateTagController = new UpdateTagController(makeUpdateTagValidation(), updateTagService)
  return makePerformanceMonitorDecorator('POST /api/tag/update/:tag_id', updateTagController)
}
