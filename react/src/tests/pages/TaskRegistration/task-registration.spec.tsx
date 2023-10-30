import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { TaskRegistration } from 'pages'

const mockCreateTask = {
  create: jest.fn(),
}

const mockUpdateTask = {
  update: jest.fn(),
}

const mockReadTasks = {
  read: jest.fn(),
}

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}

function renderTaskRegistrationComponent(id?: number) {
  return render(
    <Router>
      <ChakraProvider>
        <TaskRegistration
          createTask={mockCreateTask}
          readTasks={mockReadTasks}
          updateTask={mockUpdateTask}
          toast={mockToast}
          id={id}
        />
      </ChakraProvider>
    </Router>
  )
}

test('renders TaskRegistration component with fake data', async () => {
  const { getByTestId } = renderTaskRegistrationComponent()

  const fakeTitle = faker.datatype.string()
  const fakeDescription = faker.datatype.string()
  const fakeDateTime = faker.datatype.string()
  const fakeDuration = faker.datatype.string()

  const titleInput = getByTestId('title-input')
  const descriptionInput = getByTestId('description-input')
  const dateTimeInput = getByTestId('dateTime-input')
  const durationInput = getByTestId('duration-input')

  const submitButton = getByTestId('submit-button')

  fireEvent.change(titleInput, { target: { value: fakeTitle } })
  fireEvent.change(descriptionInput, { target: { value: fakeDescription } })
  fireEvent.change(dateTimeInput, { target: { value: fakeDateTime } })
  fireEvent.change(durationInput, { target: { value: fakeDuration } })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockCreateTask.create).toHaveBeenCalledWith({
      title: fakeTitle,
      description: fakeDescription,
      dateTime: fakeDateTime,
      duration: fakeDuration,
    })
  })

  expect(mockToast.success).toHaveBeenCalled()
})

test('renders TaskRegistration component with fake data for update', async () => {
  const taskId = 1

  const mockTaskForUpdate = {
    title: 'Updated Task Title',
    description: 'Updated task description.',
    dateTime: 'Updated task dateTime.',
    duration: 'Updated task duration.',
  }

  mockReadTasks.read.mockResolvedValue(mockTaskForUpdate)

  const { getByTestId } = renderTaskRegistrationComponent(taskId)

  const titleInput = getByTestId('title-input')
  const descriptionInput = getByTestId('description-input')
  const dateTimeInput = getByTestId('dateTime-input')
  const durationInput = getByTestId('duration-input')
  const submitButton = getByTestId('submit-button')

  await waitFor(() => {
    expect(titleInput).toHaveValue(mockTaskForUpdate.title)
    expect(descriptionInput).toHaveValue(mockTaskForUpdate.description)
    expect(dateTimeInput).toHaveValue(mockTaskForUpdate.dateTime)
    expect(durationInput).toHaveValue(mockTaskForUpdate.duration)
  })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockUpdateTask.update).toHaveBeenCalledTimes(1)
  })

  expect(mockToast.success).toHaveBeenCalled()
})
