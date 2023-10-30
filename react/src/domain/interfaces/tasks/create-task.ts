import { Task } from 'domain/models'

export interface CreateTask {
  create: (params: CreateTask.Params) => Promise<void>
}

export namespace CreateTask {
  export type Params = Task
}
