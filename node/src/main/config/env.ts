import * as dotenv from 'dotenv'

const envFile = (): string => {
  const env = process.env.NODE_ENV || 'dev'
  return `.${env}.env`
}

dotenv.config({ path: envFile() })

export default {
  base_url: process.env.BASE_URL,
  port: process.env.PORT || 5050,
  authentication: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: Number(process.env.JWT_EXPIRES),
  },
  databases: {
    postgres: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DATABASE,
    },
  },
  sentry: {
    env: process.env.SENTRY_ENVIRONMENT || 'dev',
    dsn: process.env.SENTRY_DSN,
  },
}
