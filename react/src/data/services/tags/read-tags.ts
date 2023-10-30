import { api } from 'core/services'
import { ReadTags } from 'domain/interfaces/tags'

export class ReadTagsService implements ReadTags {
  async read(id?: number): Promise<ReadTags.Result> {
    const url = id ? `/tag/load/${id}` : '/tag/load/'
    const response = await api.get(url)
    return response.data
  }
}
