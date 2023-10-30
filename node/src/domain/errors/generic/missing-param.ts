import { DomainError } from '@/domain/errors/domain-error'

export class MissingParamError extends DomainError {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
