import app from './app.js'
import config from './config/index.js'

(() => {
  app.listen(config.port, () => {
    console.log("Server listen on port ", config.port)
  })
})()