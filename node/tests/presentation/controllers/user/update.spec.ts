import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { badRequest, noContent } from '@/presentation/helpers'
import { UpdateUserController } from '@/presentation/controllers/user'
import { ValidationStub } from '@/tests/validation/mocks'
import { UpdateUserStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: UpdateUserController
  validationStub: ValidationStub
  updateUserStub: UpdateUserStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const updateUserStub = new UpdateUserStub()
  const sut = new UpdateUserController(validationStub, updateUserStub)
  return {
    sut,
    validationStub,
    updateUserStub,
  }
}
const fakeUser = {
  name: 'any_name',
  password: 'any_password',
  email: 'any_email@anydomain.com',
  cellphone: '9999999999999',
  gender: 'F',
  status: 1,
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    user_id: 1,
  },
  body: fakeUser,
})

describe('UpdateUserController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call updateUser with correct values', async () => {
    const { sut, updateUserStub } = makeSut()
    const updateUserSpy = jest.spyOn(updateUserStub, 'update')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(updateUserSpy).toHaveBeenCalledWith({
      user_id: request.params.user_id,
      informations_to_update: request.body,
    })
  })

  it('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const httpRequest = await sut.handle(makeFakeRequest())
    expect(httpRequest).toEqual(noContent())
  })
})
