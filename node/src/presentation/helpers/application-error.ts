import { QueryFailedError } from 'typeorm'
import { DomainError } from '@/domain/errors/domain-error'
import { DatabaseConnection } from '@/domain/errors/generic'
import { MonitorError } from '@/data/protocols/monitoring'
import { HttpResponse } from '@/presentation/protocols'
import { badRequest, serverError, notFound } from './http'

export class ApplicationError {
  constructor(
    private readonly error: Error | DomainError,
    private readonly monitorError: MonitorError
  ) {}

  handle(): HttpResponse {
    console.error(this.error)

    this.monitorError.capture({ error: this.error })

    if (this.error instanceof DomainError) {
      if (this.error.statusCode === 404) {
        return notFound(this.error)
      }
      return badRequest(this.error)
    }

    if (this.error instanceof QueryFailedError) {
      return serverError(new DatabaseConnection())
    }

    return serverError(this.error)
  }
}
