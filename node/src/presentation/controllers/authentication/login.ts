import { AuthenticateUser } from '@/domain/usecases/authentication'
import { badRequest, success, unauthorized } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

type BodyParams = {
  login: string
  password: string
}

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: AuthenticateUser
  ) {}

  async handle(httpRequest: HttpRequest<BodyParams>): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }

    const { login, password } = httpRequest.body

    const { access_token, profile } = await this.authentication.auth({ login, password })

    if (!access_token) {
      return unauthorized()
    }

    return success({
      access_token,
      profile,
    })
  }
}
