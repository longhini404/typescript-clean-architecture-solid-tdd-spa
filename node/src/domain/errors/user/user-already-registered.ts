import { DomainError } from '@/domain/errors/domain-error'

export class UserAlreadyRegisteredError extends DomainError {
  constructor() {
    super('User already registered')
    this.name = 'UserAlreadyRegisteredError'
  }
}
