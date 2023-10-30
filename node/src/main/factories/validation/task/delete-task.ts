import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

export const makeDeleteTaskValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('task_id'))
  return new ValidationComposite(validations)
}
