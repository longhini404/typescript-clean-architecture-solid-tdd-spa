import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeLoadUserByIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('user_id'))
  return new ValidationComposite(validations)
}
