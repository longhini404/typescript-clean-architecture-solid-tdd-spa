import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default (reducer: any) => {
  const persistedReducer = persistReducer(
    {
      key: 'frontend',
      storage,
      whitelist: ['auth'],
    },
    reducer
  )
  return persistedReducer
}
