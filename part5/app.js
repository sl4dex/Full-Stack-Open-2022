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
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// conexion a la db
logger.info('connecting to mongodb')
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to mongodb'))

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.tokenExtractor)

// usar el router con las rutas de blog
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// usar middleware para las rutas
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)


module.exports = app