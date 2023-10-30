import { createDraftSafeSelector } from '@reduxjs/toolkit'
import { RootState } from 'core/store/modules/rootReducer'

export const getState = (state: RootState) => state.auth

export const getIsLogged = createDraftSafeSelector(
  [getState],
  state => state?.signed
)

export const getToken = createDraftSafeSelector(
  [getState],
  state => state?.access_token
)

export const getProfileInfo = createDraftSafeSelector([getState], state => ({
  profile: state.profile,
}))

export const getLoadingInfo = createDraftSafeSelector([getState], state => ({
  isLoading: state.loading,
}))
