import { DeleteTag } from '@/domain/usecases/tag'
import { DeleteTagRepository, LoadTagByIdRepository } from '@/data/protocols/repository/tag'
import { TagNotFoundError } from '@/domain/errors/tag'

export class DeleteTagService implements DeleteTag {
  constructor(
    private readonly loadTagByIdRepository: LoadTagByIdRepository,
    private readonly deleteTagRepository: DeleteTagRepository
  ) {}

  async delete({ tag_id }: DeleteTag.Params): Promise<void> {
    const tagFound = await this.loadTagByIdRepository.loadById({ id: tag_id })
    if (!tagFound) {
      throw new TagNotFoundError()
    }
    await this.deleteTagRepository.delete({ tag_id })
  }
}
