import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class ControllerStub implements Controller {
  result = {
    statusCode: 0,
    body: 'any_body',
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    return this.result
  }
}
