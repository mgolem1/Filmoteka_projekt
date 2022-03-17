const app = require('./app')  // Express aplikacija
const http = require('http')
const config = require('./utilis/config')
const logger = require('./utilis/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server je pokrenut na portu ${config.PORT}`)
})