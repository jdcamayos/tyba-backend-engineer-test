import boom from '@hapi/boom'
import config from '../config/index.js'
import jwt from 'jsonwebtoken'

export function verifyJWT(req, res, next) {
  try {
    const authorization = req.headers.authorization.split(' ')
    if (authorization[0] !== 'Bearer') {
      return next(boom.badRequest())
    } else {
      req.jwt = jwt.verify(authorization[1], config.jwtSecret)
      return next()
    }
  } catch (error) {
    next(error)
  }
}
