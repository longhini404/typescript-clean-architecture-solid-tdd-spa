import { Authentication } from '@/domain/entities'

export interface AuthenticateUser {
  auth: (params: AuthenticateUser.Params) => Promise<AuthenticateUser.Result>
}

export namespace AuthenticateUser {
  export type Params = Authentication

  export type Result = {
    access_token: string
    profile: {
      name: string
      email: string
      avatar: string
      cellphone: string
    }
  }
}
