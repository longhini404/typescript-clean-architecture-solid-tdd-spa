import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['login', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
