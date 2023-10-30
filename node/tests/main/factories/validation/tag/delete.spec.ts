import { Validation } from '@/presentation/protocols'
import { makeDeleteTagController } from '@/main/factories/controllers/tag'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

jest.mock('@/validation/validators/validation-composite')

describe('DeleteTagValidationFactory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeDeleteTagController()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('tag_id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
