// El archivo index.js solo importa la aplicación real desde el
// archivo app.js y luego inicia la aplicación (con http que no se
// como se usa)
const app = require('./app')
const http = require('http')
// importa variables de entorno
const config = require('./utils/config')
// importa custom console.logs
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
