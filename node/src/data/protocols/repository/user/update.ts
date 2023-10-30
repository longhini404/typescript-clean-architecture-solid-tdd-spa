import { UpdateUser } from '@/domain/usecases/user'

export interface UpdateUserRepository {
  update: (params: UpdateUserRepository.Params) => Promise<void>
}

export namespace UpdateUserRepository {
  export type Params = UpdateUser.Params
}
