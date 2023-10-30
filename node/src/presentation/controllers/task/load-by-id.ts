import { LoadTaskById } from '@/domain/usecases/task'
import { badRequest, success } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type HttpParams = {
  task_id: number
}

export class LoadTaskByIdController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadTask: LoadTaskById
  ) {}

  async handle(httpRequest: HttpRequest<HttpParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)

    if (error) {
      return badRequest(error)
    }

    const { task_id } = httpRequest.params

    const task = await this.loadTask.load({
      task_id,
    })

    return success(task)
  }
}
