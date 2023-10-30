import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { TagListing } from 'pages'

const mockReadTags = {
  read: jest.fn(),
}

const mockDeleteTag = {
  delete: jest.fn(),
}

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}

function renderTagListingComponent() {
  return render(
    <Router>
      <ChakraProvider>
        <TagListing
          readTags={mockReadTags}
          deleteTag={mockDeleteTag}
          toast={mockToast}
        />
      </ChakraProvider>
    </Router>
  )
}

test('renders TagListing component with tags', async () => {
  mockReadTags.read.mockResolvedValue({
    tags: [
      {
        id: 1,
        title: 'Tag 1',
      },
      {
        id: 2,
        title: 'Tag 2',
      },
    ],
  })

  renderTagListingComponent()

  await waitFor(() => {
    const tag1Title = screen.getByText('Tag 1')
    const tag2Title = screen.getByText('Tag 2')

    expect(tag1Title).toBeInTheDocument()
    expect(tag2Title).toBeInTheDocument()
  })
})

test('renders TagListing component with no tags', async () => {
  mockReadTags.read.mockResolvedValue({ tags: [] })

  renderTagListingComponent()

  await waitFor(() => {
    const noTagsMessage = screen.getByText('Nenhuma tag cadastrada.')
    expect(noTagsMessage).toBeInTheDocument()
  })
})

test('deletes a tag', async () => {
  mockReadTags.read.mockResolvedValue({
    tags: [
      {
        id: 1,
        title: 'Tag 1',
      },
    ],
  })

  mockDeleteTag.delete.mockResolvedValue(undefined)

  renderTagListingComponent()

  await waitFor(() => {
    const deleteButton = screen.getByText('Deletar')
    expect(deleteButton).toBeInTheDocument()
  })

  fireEvent.click(screen.getByText('Deletar'))

  await waitFor(() => {
    expect(mockDeleteTag.delete).toHaveBeenCalledWith(1)
  })

  await waitFor(() => {
    expect(mockToast.success).toHaveBeenCalledWith({
      message: 'Tag deletada com sucesso',
      duration: 5000,
    })
  })
})
