export type Task = {
  id: number
  title: string
  description: string
  dateTime: string
  duration: string
}

export type Tasks = {
  tasks: Task[]
}
