import { ListUsers } from '@/domain/usecases/user'

export interface ListUsersRepository {
  load: (params: ListUsersRepository.Params) => Promise<ListUsersRepository.Result>
}

export namespace ListUsersRepository {
  export type Params = ListUsers.Params

  export type Result = ListUsers.Result
}
