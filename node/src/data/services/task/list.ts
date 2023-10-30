import { ListTasks } from '@/domain/usecases/task'
import { ListTasksRepository } from '@/data/protocols/repository/task'

export class ListTasksService implements ListTasks {
  constructor(private readonly listTasksRepository: ListTasksRepository) {}

  async load(params: ListTasks.Params): Promise<ListTasks.Result> {
    return await this.listTasksRepository.load(params)
  }
}
