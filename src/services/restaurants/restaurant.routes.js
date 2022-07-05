import { Router } from 'express'
import { verifyJWT } from '../../middlewares/apiValidationHandler.js'
import restaurantController from './restaurant.controller.js'

function restaurantRoute(app) {
  const router = Router()
  app.use('/api/restaurants', router)

  // Find by Coordinate
  router.get('/', verifyJWT, restaurantController.findByCoordinate)
  // Find by Place
  router.get('/:place', verifyJWT, restaurantController.findByPlace)
}

export default restaurantRoute