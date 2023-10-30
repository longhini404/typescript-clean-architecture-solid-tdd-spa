import env from '../../../main/config/env'

export = {
  type: 'postgres',
  host: env.databases.postgres.host,
  database: env.databases.postgres.database,
  username: env.databases.postgres.user,
  password: env.databases.postgres.password,
  port: +env.databases.postgres.port,
  synchronize: false,
  logging: false,
  entities: ['./src/infra/db/postgres/entities/*-entity{.ts,.js}'],
  migrations: ['./src/infra/db/postgres/migrations/*.ts'],
  cli: {
    entitiesDir: './src/infra/db/postgres/entities',
    migrationsDir: './src/infra/db/postgres/migrations',
  },
}
