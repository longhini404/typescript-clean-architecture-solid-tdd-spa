import React from 'react'
import { Login } from 'pages'
import { AuthenticationService } from 'data/services/authentication'

export const MakeLoginFactory = () => {
  const authentication = new AuthenticationService()
  return <Login authentication={authentication} />
}
