import { Tag } from '@/domain/entities'

export interface UpdateTag {
  update: (params: UpdateTag.Params) => Promise<void>
}

export namespace UpdateTag {
  export type Params = {
    tag_id: number
    information_to_update: Partial<Tag>
  }
}
