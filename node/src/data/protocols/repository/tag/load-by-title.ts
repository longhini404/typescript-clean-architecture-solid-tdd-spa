import { Tag } from '@/domain/entities'

export interface LoadTagByTitleRepository {
  loadByTitle: (params: LoadTagByTitleRepository.Params) => Promise<LoadTagByTitleRepository.Result>
}

export namespace LoadTagByTitleRepository {
  export type Result = Tag

  export type Params = {
    title: string
  }
}
