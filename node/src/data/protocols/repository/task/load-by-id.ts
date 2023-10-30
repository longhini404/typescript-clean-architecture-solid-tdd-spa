import { Task } from '@/domain/entities'

export interface LoadTaskByIdRepository {
  loadById: (params: LoadTaskByIdRepository.Params) => Promise<LoadTaskByIdRepository.Result>
}

export namespace LoadTaskByIdRepository {
  export type Result = Task

  export type Params = {
    id: number
  }
}
