export interface DeleteTag {
  delete: (taskId: number) => Promise<void>
}
