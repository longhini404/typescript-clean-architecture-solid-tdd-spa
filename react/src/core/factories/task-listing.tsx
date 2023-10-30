import React from 'react'
import { TaskListing } from 'pages'
import { ToastService } from 'data/services/toast'
import { DeleteTaskService, ReadTasksService } from 'data/services/tasks'

export const MakeTaskListingFactory = () => {
  const deleteTaskService = new DeleteTaskService()
  const readTasksService = new ReadTasksService()
  const toastService = new ToastService()
  return (
    <TaskListing
      deleteTask={deleteTaskService}
      readTasks={readTasksService}
      toast={toastService}
    />
  )
}
