import { Validation } from '@/presentation/protocols'
import { makeLoadTaskByIdController } from '@/main/factories/controllers/task'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('LoadTaskByIdValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoadTaskByIdController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('task_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
