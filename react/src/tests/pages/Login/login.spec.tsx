import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import faker from 'faker'
import { Provider } from 'react-redux'
import { Login } from 'pages'
import { store } from 'core/store'

const mockAuthentication = jest.fn()

function renderLoginComponent() {
  return render(
    <Provider store={store}>
      <Router>
        <Login authentication={{ auth: mockAuthentication }} />
      </Router>
    </Provider>
  )
}

test('renders Login component with fake data', async () => {
  const { getByTestId } = renderLoginComponent()

  const fakeEmail = faker.internet.email()
  const fakePassword = faker.internet.password()

  const loginInput = getByTestId('login-input')
  const passwordInput = getByTestId('password-input')
  const submitButton = getByTestId('submit-button')

  fireEvent.change(loginInput, { target: { value: fakeEmail } })
  fireEvent.change(passwordInput, { target: { value: fakePassword } })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockAuthentication).toHaveBeenCalledWith({
      login: fakeEmail,
      password: fakePassword,
    })
  })
})
