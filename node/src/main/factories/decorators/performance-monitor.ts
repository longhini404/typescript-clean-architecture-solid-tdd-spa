import { SentryPerformanceMonitor } from '@/infra/lib/sentry/sentry-performance-monitor'
import { PerformanceMonitorDecorator } from '@/presentation/decorator'
import { Controller } from '@/presentation/protocols'

export const makePerformanceMonitorDecorator = (
  name: string,
  controller: Controller
): Controller => {
  const performanceMonitor = new SentryPerformanceMonitor()
  return new PerformanceMonitorDecorator(name, 'controller', controller, performanceMonitor)
}
