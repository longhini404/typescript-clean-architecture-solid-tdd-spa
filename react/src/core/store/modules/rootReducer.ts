import { combineReducers } from 'redux'
import authReducer from './auth/reducers'

export const rootReducer = combineReducers({
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
