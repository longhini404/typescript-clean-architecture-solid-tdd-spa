import { LoadTagById } from '@/domain/usecases/tag'
import { LoadTagByIdRepository } from '@/data/protocols/repository/tag'
import { TagNotFoundError } from '@/domain/errors/tag'

export class LoadTagByIdService implements LoadTagById {
  constructor(private readonly loadTagByIdRepository: LoadTagByIdRepository) {}

  async load({ tag_id }: LoadTagById.Params): Promise<LoadTagById.Result> {
    const tag = await this.loadTagByIdRepository.loadById({ id: tag_id })
    if (!tag) {
      throw new TagNotFoundError()
    }
    return {
      id: tag.id,
      title: tag.title,
    }
  }
}
