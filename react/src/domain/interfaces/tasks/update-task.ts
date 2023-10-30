import { Task } from 'domain/models'

export interface UpdateTask {
  update: (id: number, params: UpdateTask.Params) => Promise<void>
}

export namespace UpdateTask {
  export type Params = Partial<Task>
}
