import 'module-alias/register'
import app from './config/app'
import env from './config/env'
import { PostgresDatabase } from '@/infra/db/postgres/helper/connection'

const bootstrap = async (): Promise<void> => {
  const database = new PostgresDatabase()

  database
    .connect()
    .then(async () => {
      app.listen(env.port, () => console.log(`server running at: http://localhost:${env.port}/api`))
    })
    .catch(error => {
      console.log(`database connection problem: ${error}`)
    })
}

bootstrap()
