import { Validation } from '@/presentation/protocols'
import { makeUpdateTagController } from '@/main/factories/controllers/tag'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('UpdateTagValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeUpdateTagController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('tag_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
