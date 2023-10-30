export interface VerifyToken {
  verify: (params: VerifyToken.Params) => Promise<VerifyToken.Result>
}

export namespace VerifyToken {
  export type Params = {
    token: string
  }

  export type Result = {
    email: string
  }
}
