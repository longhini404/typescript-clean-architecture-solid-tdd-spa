export interface PerformanceMonitor {
  start(params: PerformanceMonitor.StartParams): Promise<void>
  finish(params: PerformanceMonitor.FinishParams): Promise<void>
}

export namespace PerformanceMonitor {
  export type StartParams = {
    name: string
    operation: string
  }

  export type FinishParams = {
    status: string
  }
}
