import { Validation } from '@/presentation/protocols'
import { makeUpdateTaskController } from '@/main/factories/controllers/task'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('UpdateTaskValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeUpdateTaskController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('task_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
