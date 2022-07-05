import dotenv from 'dotenv'
dotenv.config()

const config = {
  isDev: process.env.NODE_ENV === "development",
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || "supersecret",
  googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY || "",
}

export default config