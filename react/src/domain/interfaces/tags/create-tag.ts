import { Tag } from 'domain/models'

export interface CreateTag {
  create: (params: CreateTag.Params) => Promise<void>
}

export namespace CreateTag {
  export type Params = Tag
}
