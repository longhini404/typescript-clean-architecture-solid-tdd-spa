import { DomainError } from '@/domain/errors/domain-error'

export class UnauthorizedError extends DomainError {
  constructor() {
    super('Action unauthorized, please verify your data')
    this.name = 'UnauthorizedError'
  }
}
