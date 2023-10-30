import { Validation } from '@/presentation/protocols'
import { makeDeleteTaskController } from '@/main/factories/controllers/task'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteTaskValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeDeleteTaskController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('task_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
