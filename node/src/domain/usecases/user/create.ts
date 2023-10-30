import { User } from '@/domain/entities'

export interface CreateUser {
  create: (params: CreateUser.Params) => Promise<CreateUser.Result>
}

export namespace CreateUser {
  export type Params = User

  export type Result = {
    id: number
  }
}
