import boom from '@hapi/boom'

export function notFoundHandler(req, res) {
  const { output: { statusCode, payload } } = boom.notFound()
  res.status(statusCode).json(payload)
}

