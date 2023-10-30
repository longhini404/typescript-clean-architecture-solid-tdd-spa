import { User } from '@/domain/entities'

export interface LoadUserById {
  load: (params: LoadUserById.Params) => Promise<LoadUserById.Result>
}

export namespace LoadUserById {
  export type Params = {
    user_id: number
  }

  export type Result = Omit<User, 'password'>
}
