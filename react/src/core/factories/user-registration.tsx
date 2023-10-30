import React from 'react'
import { UserRegistration } from 'pages'
import { ToastService } from 'data/services/toast'
import { UserRegistrationService } from 'data/services/user'

export const MakeUserRegistrationFactory = () => {
  const userRegistration = new UserRegistrationService()
  const toastService = new ToastService()
  return (
    <UserRegistration
      userRegistration={userRegistration}
      toast={toastService}
    />
  )
}
