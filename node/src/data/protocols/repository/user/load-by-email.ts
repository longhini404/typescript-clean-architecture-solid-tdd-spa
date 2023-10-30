import { User } from '@/domain/entities'

export interface LoadUserByEmailRepository {
  loadByEmail: (
    params: LoadUserByEmailRepository.Params
  ) => Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserByEmailRepository {
  export type Result = User

  export type Params = {
    email: string
  }
}
