import authService from "./auth.service.js"

const authController = {}

authController.logIn = async (req, res, next) => {
  try {
    const credentials = req.headers.authorization
    const apiKeyToken = await authService.logIn(credentials)
    return res.status(200).json({
      message: "Ok!",
      apiKeyToken
    })
  } catch (error) {
    next(error)
  }
}

authController.register = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const apiKeyToken = await authService.register(email, password)
    return res.status(200).json({
      message: "Ok!",
      apiKeyToken
    })
  } catch (error) {
    next(error)
  }
}

authController.logOut = async (req, res, next) => {
  try {

    return res.status(200).json({
      message: "Ok!",
      data: {}
    })
  } catch (error) {
    next(error)
  }
}

export default authController