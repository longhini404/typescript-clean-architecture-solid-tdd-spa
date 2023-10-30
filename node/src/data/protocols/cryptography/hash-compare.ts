export interface HashCompare {
  compare: (params: HashCompare.Params) => Promise<HashCompare.Result>
}

export namespace HashCompare {
  export type Params = {
    incoming_password: string
    storaged_password: string
  }

  export type Result = boolean
}
