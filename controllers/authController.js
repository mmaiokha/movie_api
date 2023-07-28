const User = require('../models/usersModel')
const {Op} = require('sequelize')
const AppError = require('../exception/AppError')
const jwt = require('jsonwebtoken')

const generateUserResponseAndRefreshTokens =async (res, user, status) => {
    const accessToken = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_ACCESS_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES * 60 * 1000 // env variable value in minutes
        }
    )
    const refreshToken = jwt.sign(
        {
            id: user.id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES * 24 * 60 * 60 * 1000 // env variable value in days
        }
    )
    user.refreshToken = refreshToken
    await user.save()

    delete user.dataValues.password
    delete user.dataValues.createdAt
    delete user.dataValues.updatedAt
    delete user.dataValues.refreshToken

    return res.status(status).json({
        user,
        accessToken,
        refreshToken
    })
}

const register = async (req, res, next) => {
    const {username, email, password, passwordConfirm} = req.body
    if (!username || !password || !passwordConfirm) {
        return next(AppError.BadRequest('Please fill all fields!'))
    }
    const candidate = await User.findAll({
        where: {
            [Op.or]: [
                {username},
                email && {email}
            ]
        }
    })
    if (candidate.length > 0) {
        return next(AppError.BadRequest('User with this email or username is already exist.'))
    }

    if (password !== passwordConfirm) {
        return next(AppError.BadRequest('Password mismatch.'))
    }

    const user = await User.create({username, email, password})
    generateUserResponseAndRefreshTokens(res, user, 200)
}

const login = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) return next(AppError.BadRequest('Please fill all fields!'))
    const candidate = await User.findOne({
        where: {
            username
        }
    })
    if (!candidate) return next(AppError.BadRequest('User does not exist!'))
    if (!await candidate.comparePassword(password)) return next(AppError.BadRequest('Wrong password!'))
    await generateUserResponseAndRefreshTokens(res, candidate, 200)
}

const currentUser = async (req, res, next) => {
    return res.status(200).json({
        user: req.user
    })
}

const refreshToken = async (req, res, next) => {
    const user = await User.findOne({where: req.user.id})
    if (!await user.compareTokens(req.headers.authorization.split(' ')[1])) {
        return next(AppError.Unauthorized())
    }
    await generateUserResponseAndRefreshTokens(res, user, 200)
}


module.exports = {
    register,
    login,
    currentUser,
    refreshToken
}