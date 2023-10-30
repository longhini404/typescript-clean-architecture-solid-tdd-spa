import { DomainError } from '@/domain/errors/domain-error'

export class AccessDeniedError extends DomainError {
  constructor() {
    super('Access denied')
    this.name = 'AccessDeniedError'
  }
}
