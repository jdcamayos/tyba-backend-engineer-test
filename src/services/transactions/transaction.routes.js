import { Router } from 'express'
import transactionController from './transaction.controller.js'

function transactionsRoute(app) {
  const router = Router()
  app.use('/api/transactions', router)

  // Get All Transactions
  router.get('/', transactionController.getAll)
  // Get Transactions By Id
  router.get('/:userId', transactionController.getById)
}

export default transactionsRoute