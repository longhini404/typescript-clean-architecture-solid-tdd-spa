import { Tasks, Task } from 'domain/models'

export interface ReadTasks {
  read: (id?: number) => Promise<ReadTasks.Result>
}

export namespace ReadTasks {
  export type Result = Tasks | Task
}
