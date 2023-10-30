import { CreateTag } from '@/domain/usecases/tag'
import { CreateTagRepository, LoadTagByTitleRepository } from '@/data/protocols/repository/tag'
import { TagAlreadyRegisteredError } from '@/domain/errors/tag'

export class CreateTagService implements CreateTag {
  constructor(
    private readonly createTagRepository: CreateTagRepository,
    private readonly loadTagByTitleRepository: LoadTagByTitleRepository
  ) {}

  async create(params: CreateTag.Params): Promise<CreateTag.Result> {
    const { title } = params

    const tagFound = await this.loadTagByTitleRepository.loadByTitle({ title })
    if (tagFound) {
      return Promise.reject(new TagAlreadyRegisteredError())
    }

    const tag = await this.createTagRepository.create({
      title,
    })

    return tag
  }
}
