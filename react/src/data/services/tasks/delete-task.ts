import { api } from 'core/services'
import { DeleteTask } from 'domain/interfaces/tasks'

export class DeleteTaskService implements DeleteTask {
  async delete(taskId: number): Promise<void> {
    await api.delete(`/task/delete/${taskId}`)
  }
}
