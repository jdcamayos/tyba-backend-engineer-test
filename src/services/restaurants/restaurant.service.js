import axios from 'axios'
import config from '../../config/index.js'
import prisma from '../../lib/prisma.js'

const baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

const restaurantService = {}

const parseResults = (results) => {
  return results.map(r => ({
    name: r.name,
    rating: r.rating,
    vicinity: r.vicinity
  }))
}

const findPlaceCoordinates = async (keyword) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&key=${config.googlePlacesApiKey}`
  const { data } = await axios.get(url)
  return {
    latitude: data.results[0].geometry.location.lat,
    longitude: data.results[0].geometry.location.lng
  }
}

const findRestaurantByPlace = async (keyword) => {
  const { latitude, longitude } = await findPlaceCoordinates(keyword)
  const queries = {
    types: "restaurant",
    key: config.googlePlacesApiKey,
    radius: 5000,
    location: `${latitude},${longitude}`
  }
  const queriesStr = Object.keys(queries).map(key => `${key}=${queries[key]}`).join('&')
  const url = baseUrl + '?' + queriesStr
  const { data } = await axios.get(url)
  return parseResults(data.results)
}

const findRestaurantByCoordinates = async ({ latitude, longitude }) => {
  const queries = {
    types: "restaurant",
    key: config.googlePlacesApiKey,
    radius: 5000,
    location: `${latitude},${longitude}`
  }
  const queriesStr = Object.keys(queries).map(key => `${key}=${queries[key]}`).join('&')
  const url = baseUrl + '?' + queriesStr
  const { data } = await axios.get(url)
  return parseResults(data.results)
}

const saveTransaction = async (id, content, isCoordinate = false) => {
  return await prisma.transaction.create({
    data: {
      content,
      isCoordinate,
      userId: id
    }
  })
}

restaurantService.findByPlace = async (id, place) => {
  const restaurants = await findRestaurantByPlace(place)
  await saveTransaction(id, place)
  return restaurants
}

restaurantService.findByCoordinate = async (id, { latitude, longitude }) => {
  const restaurants = await findRestaurantByCoordinates({ latitude, longitude })
  await saveTransaction(id, `${latitude},${longitude}`, true)
  return restaurants
}

export default restaurantService
