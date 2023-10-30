import { User } from '@/domain/entities'
import { CreateUser } from '@/domain/usecases/user'
import { badRequest, success } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type BodyParams = Omit<User, 'id'>

export class CreateUserController implements Controller {
  constructor(private readonly validation: Validation, private readonly createUser: CreateUser) {}

  async handle(httpRequest: HttpRequest<BodyParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    const userAccountId = await this.createUser.create(httpRequest.body)

    return success({
      id: userAccountId.id,
    })
  }
}
