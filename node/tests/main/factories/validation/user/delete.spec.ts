import { Validation } from '@/presentation/protocols'
import { makeDeleteUserController } from '@/main/factories/controllers/user'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteUserValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeDeleteUserController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('user_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
