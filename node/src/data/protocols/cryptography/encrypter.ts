export interface Encrypter<T = any> {
  encrypt: (params: Encrypter.Params<T>) => Promise<Encrypter.Result>
}

export namespace Encrypter {
  export type Params<T> = T

  export type Result = string
}
