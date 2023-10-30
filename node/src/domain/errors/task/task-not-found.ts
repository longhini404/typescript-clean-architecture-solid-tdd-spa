import { DomainError } from '@/domain/errors/domain-error'

export class TaskNotFoundError extends DomainError {
  constructor() {
    super('Task not found')
    this.name = 'TaskNotFoundError'
  }
}
