import { Tag } from '@/domain/entities'

export interface CreateTag {
  create: (params: CreateTag.Params) => Promise<CreateTag.Result>
}

export namespace CreateTag {
  export type Params = Tag

  export type Result = {
    id: number
  }
}
