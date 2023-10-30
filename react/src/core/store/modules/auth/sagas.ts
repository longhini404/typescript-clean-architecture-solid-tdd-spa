/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import { api } from 'core/services'
import history from 'core/services/history'
import { signInSuccess, signInFailure } from './actions'

export function* signIn({ payload }: SignInParams) {
  try {
    const response: YieldResponse = yield call(api.post, '/login', payload)
    const { access_token, profile } = response.data

    api.defaults.headers.Authorization = `Bearer ${access_token}`
    yield put(signInSuccess(access_token, profile))
    history.push('/dashboard')
  } catch {
    toast.error('Invalid credentials', { autoClose: false })
    yield put(signInFailure())
  }
}

export function signOut(): void {
  history.push('/')
}

export function setToken({ payload }: setTokenParams): void {
  if (!payload) return
  const { access_token } = payload.auth
  if (payload.auth) {
    api.defaults.headers.Authorization = `Bearer ${access_token}`
  }
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
])

type YieldResponse = {
  config?: any
  data?: any
  headers?: any
  request?: any
  status?: number
  statusText?: string
}

type SignInParams = {
  payload: {
    login: string
    password: string
  }
  type: string
}

type AuthParams = {
  access_token: string
  loading: boolean
  signed: boolean
}

type setTokenParams = {
  payload: {
    auth: AuthParams
  }
  type: string
}
