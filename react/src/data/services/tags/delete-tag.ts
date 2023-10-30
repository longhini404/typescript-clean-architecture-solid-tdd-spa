import { api } from 'core/services'
import { DeleteTag } from 'domain/interfaces/tags'

export class DeleteTagService implements DeleteTag {
  async delete(tagId: number): Promise<void> {
    await api.delete(`/tag/delete/${tagId}`)
  }
}
