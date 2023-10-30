import { DeleteTask } from '@/domain/usecases/task'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type HttpParams = {
  task_id: number
}

export class DeleteTaskController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteTask: DeleteTask
  ) {}

  async handle(httpRequest: HttpRequest<HttpParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)

    if (error) {
      return badRequest(error)
    }

    const { task_id } = httpRequest.params

    await this.deleteTask.delete({
      task_id,
    })

    return noContent()
  }
}
