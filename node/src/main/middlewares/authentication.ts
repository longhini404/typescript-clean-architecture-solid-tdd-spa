import { adaptMiddleware } from '@/main/adapters/express-middleware-adapter'
import { makeAuthenticationMiddleware } from '@/main/factories/middlewares'

export const authentication = (): any => {
  return adaptMiddleware(makeAuthenticationMiddleware())
}
