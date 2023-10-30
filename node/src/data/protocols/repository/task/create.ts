import { CreateTask } from '@/domain/usecases/task'

export interface CreateTaskRepository {
  create: (params: CreateTaskRepository.Params) => Promise<CreateTaskRepository.Result>
}

export namespace CreateTaskRepository {
  export type Params = CreateTask.Params

  export type Result = CreateTask.Result
}
