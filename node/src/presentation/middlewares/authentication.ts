import { AccessDeniedError } from '@/domain/errors/authentication'
import { VerifyToken } from '@/domain/usecases/authentication'
import { forbidden, serverError, success } from '@/presentation/helpers'
import { HttpResponse, Middleware } from '@/presentation/protocols'

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}

export class AuthenticationMiddleware implements Middleware {
  constructor(private readonly verifyToken: VerifyToken) {}

  async handle(httpRequest: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = httpRequest
      if (accessToken) {
        const account = await this.verifyToken.verify({
          token: accessToken.split(' ')[1],
        })
        if (account) {
          return success(account)
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
