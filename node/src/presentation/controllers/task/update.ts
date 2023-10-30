import { Task } from '@/domain/entities'
import { UpdateTask } from '@/domain/usecases/task'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type HttpParams = {
  task_id: number
}

type BodyParams = Partial<Task>

export class UpdateTaskController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateTask: UpdateTask
  ) {}

  async handle(httpRequest: HttpRequest<BodyParams, HttpParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)

    if (error) {
      return badRequest(error)
    }

    const { task_id } = httpRequest.params

    await this.updateTask.update({
      task_id,
      information_to_update: httpRequest.body,
    })

    return noContent()
  }
}
