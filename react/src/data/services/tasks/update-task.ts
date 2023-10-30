import { api } from 'core/services'
import { UpdateTask } from 'domain/interfaces/tasks'

export class UpdateTaskService implements UpdateTask {
  async update(id: number, task: UpdateTask.Params): Promise<void> {
    await api.post(`/task/update/${id}`, task)
  }
}
