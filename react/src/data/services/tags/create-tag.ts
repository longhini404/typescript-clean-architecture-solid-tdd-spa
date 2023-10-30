import { api } from 'core/services'
import { CreateTag } from 'domain/interfaces/tags'

export class CreateTagService implements CreateTag {
  async create(tag: CreateTag.Params): Promise<void> {
    await api.post(`/tag/create`, tag)
  }
}
