import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { sentry } from 'core/services'
import App from './App'

sentry()

ReactDOM.render(
  <Suspense fallback="loading">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
)
