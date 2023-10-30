import { DomainError } from '@/domain/errors/domain-error'

export class UserNotFoundError extends DomainError {
  constructor() {
    super('User not found')
    this.name = 'UserNotFoundError'
  }
}
