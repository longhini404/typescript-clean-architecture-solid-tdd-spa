import { Task } from '@/domain/entities'

export interface UpdateTask {
  update: (params: UpdateTask.Params) => Promise<void>
}

export namespace UpdateTask {
  export type Params = {
    task_id: number
    information_to_update: Partial<Task>
  }
}
