import restaurantService from "./restaurant.service.js"

const restaurantController = {}

restaurantController.findByPlace = async (req, res, next) => {
  try {
    const { place } = req.params
    const { id } = req.jwt
    const restaurants = await restaurantService.findByPlace(id, place)

    return res.status(200).json({
      message: "Ok!",
      data: restaurants
    })
  } catch (error) {
    next(error)
  }
}

restaurantController.findByCoordinate = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query
    const { id } = req.jwt
    const restaurants = await restaurantService.findByCoordinate(id, { latitude, longitude })

    return res.status(200).json({
      message: "Ok!",
      data: restaurants
    })
  } catch (error) {
    next(error)
  }
}

export default restaurantController