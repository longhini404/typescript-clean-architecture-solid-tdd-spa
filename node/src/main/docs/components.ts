import { authToken } from './schemas/index'
import { badRequest, forbidden, notFound, serverError, unauthorized } from './components/index'

export default {
  securitySchemes: {
    authToken: authToken,
  },
  badRequest,
  forbidden,
  notFound,
  serverError,
  unauthorized,
}
