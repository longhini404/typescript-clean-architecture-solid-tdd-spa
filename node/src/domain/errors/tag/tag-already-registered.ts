import { DomainError } from '@/domain/errors/domain-error'

export class TagAlreadyRegisteredError extends DomainError {
  constructor() {
    super('Tag already registered')
    this.name = 'TagAlreadyRegisteredError'
  }
}
