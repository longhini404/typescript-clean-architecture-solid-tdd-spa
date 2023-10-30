import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, noContent } from '@/presentation/helpers'
import { DeleteUserController } from '@/presentation/controllers/user'
import { ValidationStub } from '@/tests/validation/mocks'
import { DeleteUserStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: DeleteUserController
  validationStub: ValidationStub
  deleteUserStub: DeleteUserStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const deleteUserStub = new DeleteUserStub()
  const sut = new DeleteUserController(validationStub, deleteUserStub)
  return {
    sut,
    validationStub,
    deleteUserStub,
  }
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    user_id: 1,
  },
})

describe('DeleteUserController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call DeleteUser with correct values', async () => {
    const { sut, deleteUserStub } = makeSut()
    const DeleteUserSpy = jest.spyOn(deleteUserStub, 'delete')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(DeleteUserSpy).toHaveBeenCalledWith({
      user_id: request.params.user_id,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(noContent())
  })
})
