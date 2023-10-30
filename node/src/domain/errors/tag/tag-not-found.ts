import { DomainError } from '@/domain/errors/domain-error'

export class TagNotFoundError extends DomainError {
  constructor() {
    super('Tag not found')
    this.name = 'TagNotFoundError'
  }
}
