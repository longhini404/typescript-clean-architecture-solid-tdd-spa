import { Response } from 'express'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { ApplicationError } from '@/presentation/helpers'
import { SentryMonitorError } from '@/infra/lib/sentry'

export const adaptRoute = (controller: Controller) => {
  return async (req: HttpRequest, res: Response) => {
    const request: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      files: req.files,
      email: req.email,
    }

    let httpResponse: HttpResponse

    try {
      httpResponse = await controller.handle(request)
    } catch (error) {
      const applicationError = new ApplicationError(error, new SentryMonitorError())
      httpResponse = applicationError.handle()
    }

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).send(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).send({
        error: httpResponse.body.message,
      })
    }
  }
}
