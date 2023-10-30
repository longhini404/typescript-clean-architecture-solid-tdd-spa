import { Controller } from '@/presentation/protocols'
import { LoadTagByIdController } from '@/presentation/controllers/tag'
import { PostgresTagRepository } from '@/infra/db/postgres/repositories'
import { LoadTagByIdService } from '@/data/services/tag'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { makeLoadTagByIdValidation } from '../../validation/tag'

export const makeLoadTagByIdController = (): Controller => {
  const postgresTagRepository = new PostgresTagRepository()
  const loadTagByIdService = new LoadTagByIdService(postgresTagRepository)
  const loadTagByIdController = new LoadTagByIdController(
    makeLoadTagByIdValidation(),
    loadTagByIdService
  )
  return makePerformanceMonitorDecorator('GET /api/tag/load/:tag_id', loadTagByIdController)
}
