import { MonitorError } from '@/data/protocols/monitoring'
import * as Sentry from '@sentry/node'

export class SentryMonitorError implements MonitorError {
  async capture({ error }: MonitorError.Params): Promise<void> {
    Sentry.captureException(error)
  }
}
