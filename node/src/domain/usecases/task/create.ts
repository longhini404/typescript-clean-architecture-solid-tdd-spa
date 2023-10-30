import { Task } from '@/domain/entities'

export interface CreateTask {
  create: (params: CreateTask.Params) => Promise<CreateTask.Result>
}

export namespace CreateTask {
  export type Params = Task

  export type Result = {
    id: number
  }
}
