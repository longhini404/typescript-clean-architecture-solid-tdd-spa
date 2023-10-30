import { User } from '@/domain/entities'

export interface ListUsers {
  load: (params: ListUsers.Params) => Promise<ListUsers.Result>
}

export namespace ListUsers {
  export type Params = {
    page: number
    items: number
  }

  export type Result = {
    users: Array<Omit<User, 'password'>>
    pagination: {
      total: number
      page: number
      items: number
    }
  }
}
