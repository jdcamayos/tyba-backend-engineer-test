import config from './config/index.js'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import services from './services/index.js'
import { errorHandler, logErrors, wrapErrors } from './middlewares/errorHandler.js'
import { notFoundHandler } from './middlewares/notFoundHandler.js'

// Instance express
const app = express()

// Lib Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan(config.isDev ? 'dev' : 'common'))

// Services
await services(app)

// Error Middlewares
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)
app.use(notFoundHandler)

export default app
