import React from 'react'
import { useLocation } from 'react-router-dom'
import { TaskRegistration } from 'pages'
import { ToastService } from 'data/services/toast'
import {
  CreateTaskService,
  ReadTasksService,
  UpdateTaskService,
} from 'data/services/tasks'
import { ReadTagsService } from 'data/services/tags'

export const MakeTaskRegistrationFactory = () => {
  const createTaskService = new CreateTaskService()
  const readTagsService = new ReadTagsService()
  const readTasksService = new ReadTasksService()
  const updateTaskService = new UpdateTaskService()
  const toastService = new ToastService()

  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')

  return (
    <TaskRegistration
      createTask={createTaskService}
      readTags={readTagsService}
      readTasks={readTasksService}
      updateTask={updateTaskService}
      toast={toastService}
      id={id ? Number(id) : undefined}
    />
  )
}
