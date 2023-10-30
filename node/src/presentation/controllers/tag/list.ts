import { ListTags } from '@/domain/usecases/tag'
import { success } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

type QueryParams = {
  page: number
  items: number
}

export class ListTagsController implements Controller {
  constructor(private readonly listTags: ListTags) {}

  async handle(httpRequest: HttpRequest<QueryParams>): Promise<HttpResponse> {
    const pagination = {
      page: +httpRequest.query.page || 1,
      items: +httpRequest.query.items || 10,
    }
    const response = await this.listTags.load(pagination)

    return success({
      tags: response.tags,
      pagination: response.pagination,
    })
  }
}
