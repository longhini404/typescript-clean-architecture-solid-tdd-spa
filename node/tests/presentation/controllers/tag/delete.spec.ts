import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, noContent } from '@/presentation/helpers'
import { DeleteTagController } from '@/presentation/controllers/tag'
import { ValidationStub } from '@/tests/validation/mocks'
import { DeleteTagStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DeleteTagController
  validationStub: ValidationStub
  deleteTagStub: DeleteTagStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const deleteTagStub = new DeleteTagStub()
  const sut = new DeleteTagController(validationStub, deleteTagStub)
  return {
    sut,
    validationStub,
    deleteTagStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    tag_id: 1,
  },
})

describe('DeleteTagController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call DeleteTag with correct values', async () => {
    const { sut, deleteTagStub } = makeSut()
    const deleteTagSpy = jest.spyOn(deleteTagStub, 'delete')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(deleteTagSpy).toHaveBeenCalledWith({
      tag_id: request.params.tag_id,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(noContent())
  })
})
