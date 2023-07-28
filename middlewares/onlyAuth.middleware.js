const AppError = require('../exception/AppError')
const User = require('../models/usersModel')
const jwt = require('jsonwebtoken')

const onlyAuthMiddleware = (type) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const secretKey = type === 'access' ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET
        const decoded = jwt.verify(token, secretKey)
        if (!decoded) {
            return next(AppError.Unauthorized())
        }

        req.user = await User.findOne({where: {id: decoded.id}})
        next()
    } catch (e) {
        return next(AppError.Unauthorized())
    }
}

module.exports = onlyAuthMiddleware