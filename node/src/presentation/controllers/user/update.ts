import { User } from '@/domain/entities'
import { UpdateUser } from '@/domain/usecases/user'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type HttpParams = {
  user_id: number
}

type BodyParams = Partial<User>

export class UpdateUserController implements Controller {
  constructor(private readonly validation: Validation, private readonly updateUser: UpdateUser) {}

  async handle(httpRequest: HttpRequest<BodyParams, HttpParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)

    if (error) {
      return badRequest(error)
    }

    const { user_id } = httpRequest.params

    await this.updateUser.update({
      user_id,
      informations_to_update: httpRequest.body,
    })

    return noContent()
  }
}
