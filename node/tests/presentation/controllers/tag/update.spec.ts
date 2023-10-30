import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, noContent } from '@/presentation/helpers'
import { UpdateTagController } from '@/presentation/controllers/tag'
import { ValidationStub } from '@/tests/validation/mocks'
import { UpdateTagStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: UpdateTagController
  validationStub: ValidationStub
  updateTagStub: UpdateTagStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const updateTagStub = new UpdateTagStub()
  const sut = new UpdateTagController(validationStub, updateTagStub)
  return {
    sut,
    validationStub,
    updateTagStub,
  }
}

const fakeTag = {
  title: 'Sample Tag',
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    tag_id: 1,
  },
  body: fakeTag,
})

describe('UpdateTagController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call updateTag with correct values', async () => {
    const { sut, updateTagStub } = makeSut()
    const updateTagSpy = jest.spyOn(updateTagStub, 'update')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(updateTagSpy).toHaveBeenCalledWith({
      tag_id: request.params.tag_id,
      information_to_update: request.body,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(noContent())
  })
})
