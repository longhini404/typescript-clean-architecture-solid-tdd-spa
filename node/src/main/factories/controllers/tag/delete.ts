import { Controller } from '@/presentation/protocols'
import { DeleteTagController } from '@/presentation/controllers/tag'
import { PostgresTagRepository } from '@/infra/db/postgres/repositories'
import { DeleteTagService } from '@/data/services/tag'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'
import { makeDeleteTagValidation } from '../../validation/tag'

export const makeDeleteTagController = (): Controller => {
  const postgresTagRepository = new PostgresTagRepository()
  const deleteTagService = new DeleteTagService(postgresTagRepository, postgresTagRepository)
  const deleteTagController = new DeleteTagController(makeDeleteTagValidation(), deleteTagService)
  return makePerformanceMonitorDecorator('DELETE /api/tag/delete/:id', deleteTagController)
}
