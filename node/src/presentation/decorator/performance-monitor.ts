import { PerformanceMonitor } from '@/data/protocols/monitoring'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class PerformanceMonitorDecorator implements Controller {
  constructor(
    private readonly name: string,
    private readonly operation: string,
    private readonly controller: Controller,
    private readonly performanceMonitor: PerformanceMonitor
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    let status = 'ok'
    await this.performanceMonitor.start({ name: this.name, operation: this.operation })

    try {
      return await this.controller.handle(request)
    } catch (error) {
      status = 'unknown'
      throw error
    } finally {
      await this.performanceMonitor.finish({ status })
    }
  }
}
