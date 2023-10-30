import { Tag } from '@/domain/entities'

export interface LoadTagByIdRepository {
  loadById: (params: LoadTagByIdRepository.Params) => Promise<LoadTagByIdRepository.Result>
}

export namespace LoadTagByIdRepository {
  export type Result = Tag

  export type Params = {
    id: number
  }
}
