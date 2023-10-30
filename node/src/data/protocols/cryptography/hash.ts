export interface Hash {
  hash: (params: Hash.Params) => Promise<Hash.Result>
}

export namespace Hash {
  export type Params = {
    password: string
  }

  export type Result = string
}
