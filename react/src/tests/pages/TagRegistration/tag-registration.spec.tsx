import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { TagRegistration } from 'pages'

const mockCreateTag = {
  create: jest.fn(),
}

const mockUpdateTag = {
  update: jest.fn(),
}

const mockReadTags = {
  read: jest.fn(),
}

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}

function renderTagRegistrationComponent(id?: number) {
  return render(
    <Router>
      <ChakraProvider>
        <TagRegistration
          createTag={mockCreateTag}
          readTags={mockReadTags}
          updateTag={mockUpdateTag}
          toast={mockToast}
          id={id}
        />
      </ChakraProvider>
    </Router>
  )
}

test('renders TagRegistration component with fake data', async () => {
  const { getByTestId } = renderTagRegistrationComponent()

  const fakeTitle = faker.datatype.string()

  const titleInput = getByTestId('title-input')

  const submitButton = getByTestId('submit-button')

  fireEvent.change(titleInput, { target: { value: fakeTitle } })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockCreateTag.create).toHaveBeenCalledWith({
      title: fakeTitle,
    })
  })

  expect(mockToast.success).toHaveBeenCalled()
})

test('renders TagRegistration component with fake data for update', async () => {
  const tagId = 1

  const mockTagForUpdate = {
    title: 'Updated Tag Title',
  }

  mockReadTags.read.mockResolvedValue(mockTagForUpdate)

  const { getByTestId } = renderTagRegistrationComponent(tagId)

  const titleInput = getByTestId('title-input')

  const submitButton = getByTestId('submit-button')

  await waitFor(() => {
    expect(titleInput).toHaveValue(mockTagForUpdate.title)
  })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockUpdateTag.update).toHaveBeenCalledTimes(1)
  })

  expect(mockToast.success).toHaveBeenCalled()
})
