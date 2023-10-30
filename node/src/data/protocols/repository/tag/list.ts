import { ListTags } from '@/domain/usecases/tag'

export interface ListTagsRepository {
  load: (params: ListTagsRepository.Params) => Promise<ListTagsRepository.Result>
}

export namespace ListTagsRepository {
  export type Params = ListTags.Params

  export type Result = ListTags.Result
}
