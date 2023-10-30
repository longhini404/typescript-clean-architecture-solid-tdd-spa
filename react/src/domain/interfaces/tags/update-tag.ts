import { Tag } from 'domain/models'

export interface UpdateTag {
  update: (id: number, params: UpdateTag.Params) => Promise<void>
}

export namespace UpdateTag {
  export type Params = Partial<Tag>
}
