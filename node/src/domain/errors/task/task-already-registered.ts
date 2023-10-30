import { DomainError } from '@/domain/errors/domain-error'

export class TaskAlreadyRegisteredError extends DomainError {
  constructor() {
    super('Task already registered')
    this.name = 'TaskAlreadyRegisteredError'
  }
}
