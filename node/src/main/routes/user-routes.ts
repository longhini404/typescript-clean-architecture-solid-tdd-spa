import { Router } from 'express'
import { authentication } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeListUsersController,
  makeLoadUserByIdController,
  makeUpdateUserController,
} from '@/main/factories/controllers/user'

export default (router: Router): void => {
  router.delete('/user/delete/:user_id', authentication(), adaptRoute(makeDeleteUserController()))
  router.get('/user/load/:user_id', authentication(), adaptRoute(makeLoadUserByIdController()))
  router.get('/user/load/', authentication(), adaptRoute(makeListUsersController()))
  router.patch('/user/update/:user_id', authentication(), adaptRoute(makeUpdateUserController()))
  router.post('/user/create', adaptRoute(makeCreateUserController()))
}
