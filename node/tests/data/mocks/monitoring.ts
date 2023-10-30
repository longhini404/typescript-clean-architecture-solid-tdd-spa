import { MonitorError, PerformanceMonitor } from '@/data/protocols/monitoring'

export class MonitorErrorStub implements MonitorError {
  async capture(params: MonitorError.Params): Promise<void> {}
}

export class PerformanceMonitorStub implements PerformanceMonitor {
  async start(params: PerformanceMonitor.StartParams): Promise<void> {}
  async finish(params: PerformanceMonitor.FinishParams): Promise<void> {}
}
