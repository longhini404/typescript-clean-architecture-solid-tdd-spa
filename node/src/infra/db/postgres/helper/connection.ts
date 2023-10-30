import * as path from 'path'
import { Connection, createConnection } from 'typeorm'
import { Database } from '@/infra/db/protocols'
import env from '@/main/config/env'

export class PostgresDatabase implements Database<Connection> {
  async connect(): Promise<Connection> {
    const database = await createConnection({
      type: 'postgres',
      host: env.databases.postgres.host,
      database: env.databases.postgres.database,
      username: env.databases.postgres.user,
      password: env.databases.postgres.password,
      port: +env.databases.postgres.port,
      synchronize: false,
      migrations: [path.resolve(__dirname, '../migrations/*{.ts,.js}')],
      cli: {
        migrationsDir: path.resolve(__dirname, '../migrations'),
      },
      entities: [path.resolve(__dirname, '../entities/*-entity{.ts,.js}')],
    })

    return database
  }
}
