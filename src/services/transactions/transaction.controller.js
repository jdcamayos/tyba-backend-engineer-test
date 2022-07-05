import transactionService from './transaction.service.js'

const transactionController = {}

transactionController.getAll = async (req, res, next) => {
  try {
    const transactions = await transactionService.getAll()
    return res.status(200).json({
      message: "Ok!",
      data: transactions
    })
  } catch (error) {
    next(error)
  }
}

transactionController.getById = async (req, res, next) => {
  try {
    const id = req.params.userId
    const transactions = await transactionService.getById(id)
    return res.status(200).json({
      message: "Ok!",
      data: transactions
    })
  } catch (error) {
    next(error)
  }
}

export default transactionController