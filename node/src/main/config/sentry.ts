import * as Sentry from '@sentry/node'
import env from '@/main/config/env'

const sentry = (): void => {
  Sentry.init({
    dsn: env.sentry.dsn,
    tracesSampleRate: 1.0,
    defaultIntegrations: false,
    environment: env.sentry.env,
    integrations: [new Sentry.Integrations.Console()],
  })
}

export default sentry
