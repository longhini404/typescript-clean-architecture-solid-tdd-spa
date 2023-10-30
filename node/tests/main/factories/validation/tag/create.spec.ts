import { Validation } from '@/presentation/protocols'
import { makeCreateTagController } from '@/main/factories/controllers/tag'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('CreateTagValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateTagController()
    const validations: Validation[] = []
    for (const field of ['title']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
