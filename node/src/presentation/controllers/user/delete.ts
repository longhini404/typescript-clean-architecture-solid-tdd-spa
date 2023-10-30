import { DeleteUser } from '@/domain/usecases/user'
import { badRequest, noContent } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type HttpParams = {
  user_id: number
}

export class DeleteUserController implements Controller {
  constructor(private readonly validation: Validation, private readonly deleteUser: DeleteUser) {}

  async handle(httpRequest: HttpRequest<HttpParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.params)

    if (error) {
      return badRequest(error)
    }

    const { user_id } = httpRequest.params

    await this.deleteUser.delete({
      user_id,
    })

    return noContent()
  }
}
