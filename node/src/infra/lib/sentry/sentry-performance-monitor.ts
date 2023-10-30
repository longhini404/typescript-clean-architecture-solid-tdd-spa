import { PerformanceMonitor } from '@/data/protocols/monitoring'
import * as Sentry from '@sentry/node'
import { Transaction } from '@sentry/types'

export class SentryPerformanceMonitor implements PerformanceMonitor {
  private transaction: Transaction

  async start({ name, operation }: PerformanceMonitor.StartParams): Promise<void> {
    this.transaction = Sentry.startTransaction({ name, op: operation })

    Sentry.configureScope(scope => {
      scope.setSpan(this.transaction)
    })
  }

  async finish({ status }: PerformanceMonitor.FinishParams): Promise<void> {
    this.transaction.setStatus(status)
    this.transaction.finish()
  }
}
