import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config() // Load environment variables before anything else

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from './config/logger'
import './modules/todo/dependencyInjection'
import { v1Router } from './routes/v1'
import { AppDataSource } from './config/data-source'
import { env } from './config/enviroment'

// Server Configuration
const PORT = env.PORT || 3000

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
  app.use(cors())
  app.use(cookieParser())
  app.use(express.json())

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
