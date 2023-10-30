import { Validation } from '@/presentation/protocols'
import { makeLoginController } from '@/main/factories/controllers/authentication'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoginController()
    const validations: Validation[] = []
    for (const field of ['login', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
