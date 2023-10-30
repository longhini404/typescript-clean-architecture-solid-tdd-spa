import { Task } from '@/domain/entities'

export interface LoadTaskById {
  load: (params: LoadTaskById.Params) => Promise<LoadTaskById.Result>
}

export namespace LoadTaskById {
  export type Params = {
    task_id: number
  }

  export type Result = Task
}
