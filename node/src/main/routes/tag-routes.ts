import { Router } from 'express'
import { authentication } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeCreateTagController,
  makeDeleteTagController,
  makeListTagsController,
  makeLoadTagByIdController,
  makeUpdateTagController,
} from '@/main/factories/controllers/tag'

export default (router: Router): void => {
  router.delete('/tag/delete/:tag_id', authentication(), adaptRoute(makeDeleteTagController()))
  router.get('/tag/load/:tag_id', authentication(), adaptRoute(makeLoadTagByIdController()))
  router.get('/tag/load/', authentication(), adaptRoute(makeListTagsController()))
  router.post('/tag/update/:tag_id', authentication(), adaptRoute(makeUpdateTagController()))
  router.post('/tag/create', authentication(), adaptRoute(makeCreateTagController()))
}
