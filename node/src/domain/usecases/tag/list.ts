import { Tag } from '@/domain/entities'

export interface ListTags {
  load: (params: ListTags.Params) => Promise<ListTags.Result>
}

export namespace ListTags {
  export type Params = {
    page: number
    items: number
  }

  export type Result = {
    tags: Tag[]
    pagination: {
      total: number
      page: number
      items: number
    }
  }
}
