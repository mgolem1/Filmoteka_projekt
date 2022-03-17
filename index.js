const app = require('./app')  // Express aplikacija
const http = require('http')
const config = require('./utilis/config')
const logger = require('./utilis/logger')

const server = http.createServer(app)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	
    console.log(`Server sluša na portu ${PORT}`);
	
})