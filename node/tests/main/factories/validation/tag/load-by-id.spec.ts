import { Validation } from '@/presentation/protocols'
import { makeLoadTagByIdController } from '@/main/factories/controllers/tag'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('LoadTagByIdValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoadTagByIdController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('tag_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
