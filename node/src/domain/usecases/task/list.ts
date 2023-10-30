import { Task } from '@/domain/entities'

export interface ListTasks {
  load: (params: ListTasks.Params) => Promise<ListTasks.Result>
}

export namespace ListTasks {
  export type Params = {
    page: number
    items: number
  }

  export type Result = {
    tasks: Task[]
    pagination: {
      total: number
      page: number
      items: number
    }
  }
}
