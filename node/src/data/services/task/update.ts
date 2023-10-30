import { UpdateTask } from '@/domain/usecases/task'
import {
  UpdateTaskRepository,
  LoadTaskByIdRepository,
} from '@/data/protocols/repository/task'
import { TaskNotFoundError } from '@/domain/errors/task'

export class UpdateTaskService implements UpdateTask {
  constructor(
    private readonly loadTaskByIdRepository: LoadTaskByIdRepository,
    private readonly updateTaskRepository: UpdateTaskRepository
  ) {}

  async update({ task_id, information_to_update }: UpdateTask.Params): Promise<void> {
    const taskFound = await this.loadTaskByIdRepository.loadById({ id: task_id })
    if (!taskFound) {
      throw new TaskNotFoundError()
    }
    await this.updateTaskRepository.update({
      task_id,
      information_to_update,
    })
  }
}
