export type Task = {
  id: number
  title: string
  description: string
  dateTime: string
  duration: string
  tags?: any[]
}

export type Tasks = {
  tasks: Task[]
}
