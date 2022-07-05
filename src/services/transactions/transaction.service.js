import prisma from "../../lib/prisma.js"

const transactionService = {}

transactionService.getAll = async () => {
  const transactions = await prisma.transaction.findMany()
  return transactions
}

transactionService.getById = async (id) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      id
    }
  })
  return transactions
}

export default transactionService
