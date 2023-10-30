export interface DeleteTag {
  delete: (params: DeleteTag.Params) => Promise<void>
}

export namespace DeleteTag {
  export type Params = {
    tag_id: number
  }
}
