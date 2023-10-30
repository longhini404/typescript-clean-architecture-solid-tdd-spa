export interface Decrypter {
  decrypt: (params: Decrypter.Params) => Promise<Decrypter.Result>
}

export namespace Decrypter {
  export type Params = {
    token: string
  }

  export type Result = any
}
