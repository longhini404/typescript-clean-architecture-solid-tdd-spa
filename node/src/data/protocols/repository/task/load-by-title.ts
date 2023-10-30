import { Task } from '@/domain/entities'

export interface LoadTaskByTitleRepository {
  loadByTitle: (
    params: LoadTaskByTitleRepository.Params
  ) => Promise<LoadTaskByTitleRepository.Result>
}

export namespace LoadTaskByTitleRepository {
  export type Result = Task

  export type Params = {
    title: string
  }
}
