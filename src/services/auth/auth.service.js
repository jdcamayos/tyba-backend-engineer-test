import bcrypt from 'bcrypt'
import boom from '@hapi/boom'
import config from '../../config/index.js'
import jwt from 'jsonwebtoken'
import prisma from '../../lib/prisma.js'

const authService = {}

const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const getCredentials = (authorization) => {
  const strAuth = Buffer.from(authorization.slice(6), 'base64').toString()
  const splitIndex = strAuth.indexOf(':')
  return {
    email: strAuth.substring(0, splitIndex),
    password: strAuth.substring(splitIndex + 1)
  }
}

const generateApiKeyToken = (id) => {
  const payload = { id }
  const token = jwt.sign(payload, config.jwtSecret)
  return token
}

const createUser = async (email, password) => {
  const hashedPassword = await encryptPassword(password)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })
  return user
}

const verifyAndGetUser = async (email) => await prisma.user.findUnique({
  where: {
    email
  }
})

authService.logIn = async (credentials) => {
  const { email, password } = getCredentials(credentials)
  const user = await verifyAndGetUser(email)
  if (!user) {
    throw boom.notFound("Email not found")
  }
  if (!(await verifyPassword(password, user.password))) {
    throw boom.unauthorized("Credentials wrong")
  }
  const apiKeyToken = generateApiKeyToken(user.id)
  return apiKeyToken
}

authService.register = async (email, password) => {
  const user = await verifyAndGetUser(email)
  console.log(user)
  if (user) {
    throw boom.badData("Email is already register")
  }
  const newUser = await createUser(email, password)
  const apiKeyToken = generateApiKeyToken(newUser.id)
  return apiKeyToken
}

authService.logOut = async () => {

}


export default authService