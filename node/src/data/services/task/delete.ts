import { DeleteTask } from '@/domain/usecases/task'
import {
  DeleteTaskRepository,
  LoadTaskByIdRepository,
} from '@/data/protocols/repository/task'
import { TaskNotFoundError } from '@/domain/errors/task'

export class DeleteTaskService implements DeleteTask {
  constructor(
    private readonly loadTaskByIdRepository: LoadTaskByIdRepository,
    private readonly deleteTaskRepository: DeleteTaskRepository
  ) {}

  async delete({ task_id }: DeleteTask.Params): Promise<void> {
    const taskFound = await this.loadTaskByIdRepository.loadById({ id: task_id })
    if (!taskFound) {
      throw new TaskNotFoundError()
    }
    await this.deleteTaskRepository.delete({ task_id })
  }
}
