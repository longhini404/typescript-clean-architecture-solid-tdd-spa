import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const sentry = (): void => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
      }),
    ],
    environment: process.env.REACT_APP_SENTRY_ENV,
    tracesSampleRate: 1.0,
  })
}

export default sentry
