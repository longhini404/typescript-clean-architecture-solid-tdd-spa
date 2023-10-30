import { Validation } from '@/presentation/protocols'
import { makeLoadUserByIdController } from '@/main/factories/controllers/user'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('LoadUserByIdValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoadUserByIdController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('user_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
