import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeCreateTaskValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['title', 'description', 'dateTime', 'duration']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
