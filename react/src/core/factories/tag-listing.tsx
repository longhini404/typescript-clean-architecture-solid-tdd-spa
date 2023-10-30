import React from 'react'
import { TagListing } from 'pages'
import { ToastService } from 'data/services/toast'
import { DeleteTagService, ReadTagsService } from 'data/services/tags'

export const MakeTagListingFactory = () => {
  const deleteTagService = new DeleteTagService()
  const readTagsService = new ReadTagsService()
  const toastService = new ToastService()
  return (
    <TagListing
      deleteTag={deleteTagService}
      readTags={readTagsService}
      toast={toastService}
    />
  )
}
