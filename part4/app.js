
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// pedir variables de entorno
const config = require('./utils/config')
// console.log personalizados
const logger = require('./utils/logger')
// pedir middleware
const middleware = require('./utils/middleware')
// pedir el router de blogs
const blogRouter = require('./controllers/blogs')

// conexion a la db
logger.info("connecting to mongodb")
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info("connected to mongodb"))

app.use(cors())
app.use(express.json())

// usar el router con las rutas de blog
app.use('/api/blogs', blogRouter)

// usar middleware para las rutas
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app