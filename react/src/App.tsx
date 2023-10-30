import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from 'core/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import Routes from 'core/router'
import { history } from 'core/services'
import { theme } from 'styles'
import * as Sentry from '@sentry/react'

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={history}>
        <ChakraProvider theme={theme}>
          <input type="hidden" value="HashCommit" />
          <ToastContainer />
          <Routes />
        </ChakraProvider>
      </Router>
    </PersistGate>
  </Provider>
)

export default Sentry.withProfiler(App)
