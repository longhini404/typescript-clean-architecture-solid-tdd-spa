import { Tags, Tag } from 'domain/models'

export interface ReadTags {
  read: (id?: number) => Promise<ReadTags.Result>
}

export namespace ReadTags {
  export type Result = Tags | Tag
}
