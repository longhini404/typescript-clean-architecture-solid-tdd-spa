import { api } from 'core/services'
import { CreateTask } from 'domain/interfaces/tasks'

export class CreateTaskService implements CreateTask {
  async create(task: CreateTask.Params): Promise<void> {
    console.log(task)
    await api.post(`/task/create`, task)
  }
}
