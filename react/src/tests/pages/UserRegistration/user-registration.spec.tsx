import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { UserRegistration } from 'pages'

const mockUserRegistration = {
  create: jest.fn(),
}

const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
}

function renderUserRegistrationComponent() {
  return render(
    <Router>
      <ChakraProvider>
        <UserRegistration
          userRegistration={mockUserRegistration}
          toast={mockToast}
        />
      </ChakraProvider>
    </Router>
  )
}

test('renders UserRegistration component with fake data', async () => {
  const { getByTestId } = renderUserRegistrationComponent()

  const fakeName = faker.name.firstName()
  const fakeEmail = faker.internet.email()
  const fakePassword = faker.internet.password()
  const fakeConfirmPassword = fakePassword
  const fakeCellphone = faker.datatype
    .number({
      min: 10000000000,
      max: 99999999999,
    })
    .toString()
  const fakeGender = faker.random.arrayElement(['M', 'F', 'O'])

  const nameInput = getByTestId('name-input')
  const emailInput = getByTestId('email-input')
  const passwordInput = getByTestId('password-input')
  const confirmPasswordInput = getByTestId('confirm-password-input')
  const cellphoneInput = getByTestId('cellphone-input')
  const genderSelect = getByTestId('gender-select')
  const submitButton = getByTestId('submit-button')

  fireEvent.change(nameInput, { target: { value: fakeName } })
  fireEvent.change(emailInput, { target: { value: fakeEmail } })
  fireEvent.change(passwordInput, { target: { value: fakePassword } })
  fireEvent.change(confirmPasswordInput, {
    target: { value: fakeConfirmPassword },
  })
  fireEvent.change(cellphoneInput, { target: { value: fakeCellphone } })
  fireEvent.change(genderSelect, { target: { value: fakeGender } })

  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(mockUserRegistration.create).toHaveBeenCalledWith({
      name: fakeName,
      email: fakeEmail,
      password: fakePassword,
      confirmPassword: fakeConfirmPassword,
      cellphone: fakeCellphone,
      gender: fakeGender,
    })
  })

  expect(mockToast.success).toHaveBeenCalled()
})
