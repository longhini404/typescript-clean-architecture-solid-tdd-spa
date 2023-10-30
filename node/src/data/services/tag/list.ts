import { ListTags } from '@/domain/usecases/tag'
import { ListTagsRepository } from '@/data/protocols/repository/tag'

export class ListTagsService implements ListTags {
  constructor(private readonly listTagsRepository: ListTagsRepository) {}

  async load(params: ListTags.Params): Promise<ListTags.Result> {
    return await this.listTagsRepository.load(params)
  }
}
