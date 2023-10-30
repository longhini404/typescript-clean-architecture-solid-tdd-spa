import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeLoginController } from '@/main/factories/controllers/authentication'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
