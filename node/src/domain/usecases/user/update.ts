import { User } from '@/domain/entities'

export interface UpdateUser {
  update: (params: UpdateUser.Params) => Promise<void>
}

export namespace UpdateUser {
  export type Params = {
    user_id: number
    informations_to_update: Partial<User>
  }
}
