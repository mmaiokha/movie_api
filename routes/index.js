const {Router} = require('express')
const authRouter = require('./authRouter')

const routes = Router()

routes.use('/auth', authRouter)

module.exports = routes
