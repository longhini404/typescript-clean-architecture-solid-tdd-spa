import { User } from 'domain/models'

export interface UserRegistration {
  create: (params: UserRegistration.Params) => Promise<void>
}

export namespace UserRegistration {
  export type Params = User
}
