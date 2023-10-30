import { DeleteTag } from '@/domain/usecases/tag'

export interface DeleteTagRepository {
  delete: (params: DeleteTagRepository.Params) => Promise<void>
}

export namespace DeleteTagRepository {
  export type Params = DeleteTag.Params
}
