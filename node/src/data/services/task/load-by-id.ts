import { LoadTaskById } from '@/domain/usecases/task'
import { LoadTaskByIdRepository } from '@/data/protocols/repository/task'
import { TaskNotFoundError } from '@/domain/errors/task'

export class LoadTaskByIdService implements LoadTaskById {
  constructor(private readonly loadTaskByIdRepository: LoadTaskByIdRepository) {}

  async load({ task_id }: LoadTaskById.Params): Promise<LoadTaskById.Result> {
    const task = await this.loadTaskByIdRepository.loadById({ id: task_id })
    if (!task) {
      throw new TaskNotFoundError()
    }
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      dateTime: task.dateTime,
      duration: task.duration,
      tags: task.tags,
    }
  }
}
