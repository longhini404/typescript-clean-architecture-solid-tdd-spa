import { MissingParamError } from '@/domain/errors/generic'
import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (!(this.fieldName in input)) {
      return new MissingParamError(this.fieldName)
    }
  }
}
