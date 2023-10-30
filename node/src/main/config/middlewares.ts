import { Express } from 'express'
import { bodyParser, contentType, configCors } from '@/main/middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(configCors)
  app.use(contentType)
}
