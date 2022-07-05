import path from 'path'
import fs from 'fs/promises'

const services = async (app) => {
  try {
    const basePath = path.resolve('src', 'services')
    const files = (await fs.readdir(basePath))
      .filter(file => !file.includes('.js'))
      .map(file => path.resolve(basePath, file, 'index.js'))
      .map(service => import(service))
    const importedServices = await Promise.all(files)
    importedServices.map(service => service.default(app))
  } catch (error) {
    console.log(error)
  }
}

export default services