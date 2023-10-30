import { MissingParamError } from '@/domain/errors/generic'
import { HttpRequest } from '@/presentation/protocols'
import { success, badRequest } from '@/presentation/helpers'
import { CreateUserController } from '@/presentation/controllers/user'
import { ValidationStub } from '@/tests/validation/mocks'
import { CreateUserStub } from '@/tests/presentation/mocks'

interface SutTypes {
  sut: CreateUserController
  validationStub: ValidationStub
  createUserStub: CreateUserStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const createUserStub = new CreateUserStub()
  const sut = new CreateUserController(validationStub, createUserStub)
  return {
    sut,
    validationStub,
    createUserStub,
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
  body: fakeUser,
})

describe('CreateUserController', () => {
  it('Should return error if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    const error = new MissingParamError('wrong_field')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(error))
  })

  it('Should call CreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut()
    const createUserSpy = jest.spyOn(createUserStub, 'create')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(createUserSpy).toHaveBeenCalledWith(fakeUser)
  })

  it('Should return 200 on success', async () => {
    const { sut, createUserStub } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(
      success({
        id: createUserStub.result.id,
      })
    )
  })
})
