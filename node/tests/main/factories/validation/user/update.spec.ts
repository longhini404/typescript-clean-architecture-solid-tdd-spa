import { Validation } from '@/presentation/protocols'
import { makeUpdateUserController } from '@/main/factories/controllers/user'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('UpdateUserValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeUpdateUserController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('user_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
