import { CreateTag } from '@/domain/usecases/tag'

export interface CreateTagRepository {
  create: (params: CreateTagRepository.Params) => Promise<CreateTagRepository.Result>
}

export namespace CreateTagRepository {
  export type Params = CreateTag.Params

  export type Result = CreateTag.Result
}
