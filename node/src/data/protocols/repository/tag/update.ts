import { UpdateTag } from '@/domain/usecases/task'

export interface UpdateTagRepository {
  update: (params: UpdateTagRepository.Params) => Promise<void>
}

export namespace UpdateTagRepository {
  export type Params = UpdateTag.Params
}
