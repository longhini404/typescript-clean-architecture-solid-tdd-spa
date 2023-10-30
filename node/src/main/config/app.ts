import express from 'express'
import middlewares from './middlewares'
import routes from './routes'
import swagger from './swagger'
import sentry from './sentry'

const app = express()
sentry()
swagger(app)
middlewares(app)
routes(app)

export default app
