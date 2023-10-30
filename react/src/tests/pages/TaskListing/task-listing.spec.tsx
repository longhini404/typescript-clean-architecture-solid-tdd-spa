import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { TaskListing } from 'pages'

const mockReadTasks = {
  read: jest.fn(),
}

const mockDeleteTask = {
  delete: jest.fn(),
}

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}

function renderTaskListingComponent() {
  return render(
    <Router>
      <ChakraProvider>
        <TaskListing
          readTasks={mockReadTasks}
          deleteTask={mockDeleteTask}
          toast={mockToast}
        />
      </ChakraProvider>
    </Router>
  )
}

test('renders TaskListing component with tasks', async () => {
  mockReadTasks.read.mockResolvedValue({
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
      },
    ],
  })

  renderTaskListingComponent()

  await waitFor(() => {
    const task1Title = screen.getByText('Task 1')
    const task2Title = screen.getByText('Task 2')

    expect(task1Title).toBeInTheDocument()
    expect(task2Title).toBeInTheDocument()
  })
})

test('renders TaskListing component with no tasks', async () => {
  mockReadTasks.read.mockResolvedValue({ tasks: [] })

  renderTaskListingComponent()

  await waitFor(() => {
    const noTasksMessage = screen.getByText('Nenhum tarefa cadastrado.')
    expect(noTasksMessage).toBeInTheDocument()
  })
})

test('deletes a task', async () => {
  mockReadTasks.read.mockResolvedValue({
    tasks: [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
      },
    ],
  })

  mockDeleteTask.delete.mockResolvedValue(undefined)

  renderTaskListingComponent()

  await waitFor(() => {
    const deleteButton = screen.getByText('Deletar')
    expect(deleteButton).toBeInTheDocument()
  })

  fireEvent.click(screen.getByText('Deletar'))

  await waitFor(() => {
    expect(mockDeleteTask.delete).toHaveBeenCalledWith(1)
  })

  await waitFor(() => {
    expect(mockToast.success).toHaveBeenCalledWith({
      message: 'Tarefa deletada com sucesso',
      duration: 5000,
    })
  })
})
