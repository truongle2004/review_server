import 'dotenv/config'
import { DataSource } from 'typeorm'
import { env } from './enviroment'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['src/entities/*.entity.ts'],
  synchronize: env.DB_SYNC === 'true',
  logging: env.DB_LOGGING === 'true'
})
