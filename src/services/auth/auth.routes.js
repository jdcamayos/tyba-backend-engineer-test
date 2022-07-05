import { Router } from 'express'
import authController from './auth.controller.js'

function authRoute(app) {
  const router = Router()
  app.use('/api/auth', router)

  // Login
  router.get('/login', authController.logIn)
  // Register
  router.post('/register', authController.register)
  // Logout
  router.get('/logout', authController.logOut)
}

export default authRoute