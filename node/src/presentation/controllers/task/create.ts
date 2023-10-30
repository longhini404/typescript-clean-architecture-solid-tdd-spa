import { Task } from '@/domain/entities'
import { CreateTask } from '@/domain/usecases/task'
import { badRequest, success } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type BodyParams = Omit<Task, 'id'>

export class CreateTaskController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createTask: CreateTask
  ) {}

  async handle(httpRequest: HttpRequest<BodyParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    const task = await this.createTask.create(httpRequest.body)

    return success({
      id: task.id,
    })
  }
}
