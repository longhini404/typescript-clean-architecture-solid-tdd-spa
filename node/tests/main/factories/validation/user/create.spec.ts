import { Validation } from '@/presentation/protocols'
import { makeCreateUserController } from '@/main/factories/controllers/user'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('CreateUserValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateUserController()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'cellphone', 'gender']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
