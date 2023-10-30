import { Controller } from '@/presentation/protocols'
import { ListTagsController } from '@/presentation/controllers/tag'
import { PostgresTagRepository } from '@/infra/db/postgres/repositories'
import { ListTagsService } from '@/data/services/tag'
import { makePerformanceMonitorDecorator } from '@/main/factories/decorators'

export const makeListTagsController = (): Controller => {
  const postgresTagRepository = new PostgresTagRepository()
  const listTagsService = new ListTagsService(postgresTagRepository)
  const listTagsController = new ListTagsController(listTagsService)
  return makePerformanceMonitorDecorator('GET /api/tag/load/', listTagsController)
}
