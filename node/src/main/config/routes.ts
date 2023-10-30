/* eslint-disable prettier/prettier */
import { readdirSync } from 'fs'
import { Express, Router } from 'express'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.endsWith('.map')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
