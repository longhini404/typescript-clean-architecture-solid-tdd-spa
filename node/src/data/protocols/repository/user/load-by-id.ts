import { User } from '@/domain/entities'

export interface LoadUserByIdRepository {
  loadById: (params: LoadUserByIdRepository.Params) => Promise<LoadUserByIdRepository.Result>
}

export namespace LoadUserByIdRepository {
  export type Result = User

  export type Params = {
    id: number
  }
}
