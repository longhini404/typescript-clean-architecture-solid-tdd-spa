import React from 'react'
import { useLocation } from 'react-router-dom'
import { TagRegistration } from 'pages'
import { ToastService } from 'data/services/toast'
import {
  CreateTagService,
  ReadTagsService,
  UpdateTagService,
} from 'data/services/tags'

export const MakeTagRegistrationFactory = () => {
  const createTagService = new CreateTagService()
  const readTagsService = new ReadTagsService()
  const updateTagService = new UpdateTagService()
  const toastService = new ToastService()

  const location = useLocation()
  const id = new URLSearchParams(location.search).get('id')

  return (
    <TagRegistration
      createTag={createTagService}
      readTags={readTagsService}
      updateTag={updateTagService}
      toast={toastService}
      id={id ? Number(id) : undefined}
    />
  )
}
