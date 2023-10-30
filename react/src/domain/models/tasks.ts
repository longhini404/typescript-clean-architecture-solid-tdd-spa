export type Task = {
  id: number
  title: string
  description: string
  dateTime: string
  duration: string
  tags?: [
    {
      label: string
      value: string
    }
  ]
}

export type Tasks = {
  tasks: Task[]
}
