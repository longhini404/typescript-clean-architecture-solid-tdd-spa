import React from 'react'
import { TaskListing } from 'pages'
import { ToastService } from 'data/services/toast'
import { DeleteTaskService, ReadTasksService } from 'data/services/tasks'
import { ReadTagsService } from 'data/services/tags'

export const MakeTaskListingFactory = () => {
  const deleteTaskService = new DeleteTaskService()
  const readTagsService = new ReadTagsService()
  const readTasksService = new ReadTasksService()
  const toastService = new ToastService()
  return (
    <TaskListing
      deleteTask={deleteTaskService}
      readTags={readTagsService}
      readTasks={readTasksService}
      toast={toastService}
    />
  )
}
