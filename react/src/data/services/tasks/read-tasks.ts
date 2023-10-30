import { api } from 'core/services'
import { ReadTasks } from 'domain/interfaces/tasks'

export class ReadTasksService implements ReadTasks {
  async read(id?: number): Promise<ReadTasks.Result> {
    const url = id ? `/task/load/${id}` : '/task/load/'
    const response = await api.get(url)
    return response.data
  }
}
