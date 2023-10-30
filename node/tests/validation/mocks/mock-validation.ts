import { Validation } from '@/presentation/protocols'

export class ValidationStub implements Validation {
  error: Error = null
  input: any

  validate(input: any): Error {
    this.input = input
    return this.error
  }
}

export class ValidationSpy implements Validation {
  input: string

  validate(input: any): Error {
    this.input = input
    return null
  }
}
