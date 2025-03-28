import 'dotenv/config'
import 'reflect-metadata'
import './modules/product/di'
import './modules/review/di'
import './modules/rating/di'
import './modules/todo/dependencyInjection'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from './config/data-source'
import { env } from './config/enviroment'
import logger from './config/logger'
import errorHandle from './middleware/errorHandler'
import { v1Router } from './routes/v1'
import path from 'path'

// Server Configuration
const PORT = env.PORT

/**
 * Establish Database Connection
 */
const connectDatabase = async () => {
  try {
    await AppDataSource.initialize()
    logger.info('✅ Database connected successfully!')
  } catch (error) {
    logger.error('❌ Database connection failed:', error)
    process.exit(1) // Exit process on failure
  }
}

/**
 * Initialize Express Application
 */
const startServer = () => {
  const app = express()

  // Middlewares
  app.use(
    cors({
      origin: ['http://localhost:3001'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    })
  )


  app.use(cookieParser())

  app.use(errorHandle)

  app.use(express.json())


  app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

  app.use(
    '/static',
    // express.static(path.join(__dirname, '../../public/images/'))
    express.static(path.resolve(__dirname, './public/images/'))
  )


  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.warn(req.method + ' ' + req.originalUrl)
    next()
  })

  app.use(express.urlencoded({ extended: false }))

  // API Routes
  app.use('/v1', v1Router)

  // Start Server
  app.listen(PORT, () => logger.info(`🚀 Server running on port ${PORT}`))
}

/**
 * Main Execution
 */
;(async () => {
  await connectDatabase()
  startServer()
})()
