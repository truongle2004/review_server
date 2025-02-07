import { DataSource } from 'typeorm'
import 'dotenv/config'
import { env } from './enviroment'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['src/entities/*.ts'],
  synchronize: env.DB_SYNC === 'true',
  logging: env.DB_LOGGING === 'true'
})
