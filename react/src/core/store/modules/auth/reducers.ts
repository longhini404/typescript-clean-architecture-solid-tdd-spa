/* eslint-disable no-param-reassign */
import produce from 'immer'
import { AnyAction } from 'redux'
import * as actionTypes from './actionsTypes'

const INITIAL_STATE = {
  access_token: null,
  loading: false,
  signed: false,
  profile: {
    name: '',
    email: '',
    avatar: '',
    cellphone: '',
  },
}

export default function auth(state = INITIAL_STATE, action: AnyAction): any {
  return produce(state, draft => {
    switch (action.type) {
      case actionTypes.SIGN_IN_REQUEST: {
        draft.loading = true
        break
      }
      case actionTypes.SIGN_IN_SUCCESS: {
        draft.access_token = action.payload.access_token
        draft.profile = action.payload.profile
        draft.signed = true
        draft.loading = false
        break
      }
      case actionTypes.SIGN_IN_FAILURE: {
        draft.loading = false
        break
      }
      case actionTypes.SIGN_OUT: {
        draft.access_token = null
        draft.loading = false
        draft.signed = false
        draft.profile = {
          name: '',
          email: '',
          avatar: '',
          cellphone: '',
        }
        break
      }
      default:
        break
    }
  })
}
