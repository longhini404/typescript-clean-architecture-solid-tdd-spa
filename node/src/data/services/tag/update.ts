import { UpdateTag } from '@/domain/usecases/tag'
import { UpdateTagRepository, LoadTagByIdRepository } from '@/data/protocols/repository/tag'
import { TagNotFoundError } from '@/domain/errors/tag'

export class UpdateTagService implements UpdateTag {
  constructor(
    private readonly loadTagByIdRepository: LoadTagByIdRepository,
    private readonly updateTagRepository: UpdateTagRepository
  ) {}

  async update({ tag_id, information_to_update }: UpdateTag.Params): Promise<void> {
    const tagFound = await this.loadTagByIdRepository.loadById({ id: tag_id })
    if (!tagFound) {
      throw new TagNotFoundError()
    }
    await this.updateTagRepository.update({
      tag_id,
      information_to_update,
    })
  }
}
