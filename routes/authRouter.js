const {Router} = require('express')
const authController = require('../controllers/authController')
const onlyAuthMiddleware = require('../middlewares/onlyAuth.middleware')

const authRouter = Router()

authRouter.route('/register').post(authController.register)
authRouter.route('/login').post(authController.login)
authRouter.route('/refresh-token').put(
    onlyAuthMiddleware('refresh'),
    authController.refreshToken
)
authRouter.route('/me').get(
    onlyAuthMiddleware('access'),
    authController.currentUser
)

module.exports = authRouter