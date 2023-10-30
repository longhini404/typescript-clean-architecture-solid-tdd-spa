export interface MonitorError {
  capture: (params: MonitorError.Params) => Promise<void>
}

export namespace MonitorError {
  export type Params = {
    error: Error
  }
}
