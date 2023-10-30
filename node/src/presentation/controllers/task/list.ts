import { ListTasks } from '@/domain/usecases/task'
import { success } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

type QueryParams = {
  page: number
  items: number
}

export class ListTasksController implements Controller {
  constructor(private readonly listTasks: ListTasks) {}

  async handle(httpRequest: HttpRequest<QueryParams>): Promise<HttpResponse> {
    const pagination = {
      page: +httpRequest.query.page || 1,
      items: +httpRequest.query.items || 10,
    }
    const response = await this.listTasks.load(pagination)

    return success({
      tasks: response.tasks,
      pagination: response.pagination,
    })
  }
}
