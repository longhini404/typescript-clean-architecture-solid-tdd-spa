export interface DeleteTask {
  delete: (taskId: number) => Promise<void>
}
