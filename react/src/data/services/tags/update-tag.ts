import { api } from 'core/services'
import { UpdateTag } from 'domain/interfaces/tags'

export class UpdateTagService implements UpdateTag {
  async update(id: number, tag: UpdateTag.Params): Promise<void> {
    await api.post(`/tag/update/${id}`, tag)
  }
}
