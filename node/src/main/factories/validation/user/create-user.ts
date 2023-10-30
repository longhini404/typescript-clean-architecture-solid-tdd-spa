import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeCreateUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'cellphone', 'gender']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
