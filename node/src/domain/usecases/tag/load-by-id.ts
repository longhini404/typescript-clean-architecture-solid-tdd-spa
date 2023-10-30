import { Tag } from '@/domain/entities'

export interface LoadTagById {
  load: (params: LoadTagById.Params) => Promise<LoadTagById.Result>
}

export namespace LoadTagById {
  export type Params = {
    tag_id: number
  }

  export type Result = Tag
}
