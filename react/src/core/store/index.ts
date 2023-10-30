import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import * as Sentry from '@sentry/react'
import { rootReducer } from './modules/rootReducer'
import rootSaga from './modules/rootSaga'
import persistReducers from './persistReducers'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const sagaMiddleware = createSagaMiddleware()

const sentryReduxEnhancer = Sentry.createReduxEnhancer({})

const composeEnhancers =
  (process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose

const store = createStore(
  persistReducers(rootReducer),
  composeEnhancers(applyMiddleware(sagaMiddleware), sentryReduxEnhancer)
)

const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export { store, persistor }
