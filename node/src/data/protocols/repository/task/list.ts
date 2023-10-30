import { ListTasks } from '@/domain/usecases/task'

export interface ListTasksRepository {
  load: (params: ListTasksRepository.Params) => Promise<ListTasksRepository.Result>
}

export namespace ListTasksRepository {
  export type Params = ListTasks.Params

  export type Result = ListTasks.Result
}
