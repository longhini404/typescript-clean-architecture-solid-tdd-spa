export interface DeleteUser {
  delete: (params: DeleteUser.Params) => Promise<void>
}

export namespace DeleteUser {
  export type Params = {
    user_id: number
  }
}
