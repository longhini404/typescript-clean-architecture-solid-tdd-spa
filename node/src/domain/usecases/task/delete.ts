export interface DeleteTask {
  delete: (params: DeleteTask.Params) => Promise<void>
}

export namespace DeleteTask {
  export type Params = {
    task_id: number
  }
}
