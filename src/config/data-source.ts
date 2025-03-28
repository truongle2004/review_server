import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()
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

  synchronize:true,
  logging: env.DB_LOGGING as boolean,
  entitySkipConstructor: true
})

