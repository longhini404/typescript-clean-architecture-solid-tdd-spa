import { DeleteTask } from '@/domain/usecases/task'

export interface DeleteTaskRepository {
  delete: (params: DeleteTaskRepository.Params) => Promise<void>
}

export namespace DeleteTaskRepository {
  export type Params = DeleteTask.Params
}
