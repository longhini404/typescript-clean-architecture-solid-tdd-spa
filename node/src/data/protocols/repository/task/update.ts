import { UpdateTask } from '@/domain/usecases/task'

export interface UpdateTaskRepository {
  update: (params: UpdateTaskRepository.Params) => Promise<void>
}

export namespace UpdateTaskRepository {
  export type Params = UpdateTask.Params
}
