import { CreateTask } from '@/domain/usecases/task'
import { CreateTaskRepository, LoadTaskByTitleRepository } from '@/data/protocols/repository/task'
import { TaskAlreadyRegisteredError } from '@/domain/errors/task'

export class CreateTaskService implements CreateTask {
  constructor(
    private readonly createTaskRepository: CreateTaskRepository,
    private readonly loadTaskByTitleRepository: LoadTaskByTitleRepository
  ) {}

  async create(params: CreateTask.Params): Promise<CreateTask.Result> {
    const { title, description, dateTime, duration, tags } = params

    const taskFound = await this.loadTaskByTitleRepository.loadByTitle({ title })
    if (taskFound) {
      return Promise.reject(new TaskAlreadyRegisteredError())
    }

    const task = await this.createTaskRepository.create({
      title,
      description,
      dateTime,
      duration,
      tags,
    })

    return task
  }
}
