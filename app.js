require('dotenv').config()
const express = require('express')
const routes = require('./routes/index')
const AppError = require('./exception/AppError')

const cors = require('cors')
const cookieParser = require('cookie-parser')
const exceptionsMiddleware = require('./middlewares/exceptions.middleware')

const app = express()

// MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// ROUTES
app.use('/api', routes)


// ERRORS
app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 400))
})
app.use(exceptionsMiddleware)

module.exports = app