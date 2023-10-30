import { ListUsers } from '@/domain/usecases/user'
import { success } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

type QueryParams = {
  page: number
  items: number
}

export class ListUsersController implements Controller {
  constructor(private readonly listUsers: ListUsers) {}

  async handle(httpRequest: HttpRequest<QueryParams>): Promise<HttpResponse> {
    const pagination = {
      page: +httpRequest.query.page || 1,
      items: +httpRequest.query.items || 10,
    }
    const response = await this.listUsers.load(pagination)

    return success({
      users: response.users,
      pagination: response.pagination,
    })
  }
}
