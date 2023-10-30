import * as actionTypes from './actionsTypes'

type ProfileProps = {
  name: string
  email: string
  avatar: string
  cellphone: string
}

export function signInSuccess(
  access_token: string,
  profile: ProfileProps
): any {
  return {
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: {
      access_token,
      profile,
    },
  }
}

export function signInRequest(login: string, password: string): any {
  return {
    type: actionTypes.SIGN_IN_REQUEST,
    payload: {
      login,
      password,
    },
  }
}

export function signInFailure(): any {
  return {
    type: actionTypes.SIGN_IN_FAILURE,
  }
}

export function signOut(): any {
  return {
    type: actionTypes.SIGN_OUT,
  }
}
