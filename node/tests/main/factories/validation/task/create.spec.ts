import { Validation } from '@/presentation/protocols'
import { makeCreateTaskController } from '@/main/factories/controllers/task'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('CreateTaskValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateTaskController()
    const validations: Validation[] = []
    for (const field of ['title', 'description', 'dateTime', 'duration']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
