import { Router } from 'express'
import { authentication } from '@/main/middlewares'
import { adaptRoute } from '@/main/adapters'
import {
  makeCreateTaskController,
  makeDeleteTaskController,
  makeListTasksController,
  makeLoadTaskByIdController,
  makeUpdateTaskController,
} from '@/main/factories/controllers/task'

export default (router: Router): void => {
  router.delete(
    '/task/delete/:task_id',
    authentication(),
    adaptRoute(makeDeleteTaskController())
  )
  router.get(
    '/task/load/:task_id',
    authentication(),
    adaptRoute(makeLoadTaskByIdController())
  )
  router.get('/task/load/', authentication(), adaptRoute(makeListTasksController()))
  router.post(
    '/task/update/:task_id',
    authentication(),
    adaptRoute(makeUpdateTaskController())
  )
  router.post('/task/create', authentication(), adaptRoute(makeCreateTaskController()))
}
