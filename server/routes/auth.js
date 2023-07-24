const router = require('express').Router()
const { userSigninValidator, userSignupValidator } = require('../utils/validators/auth')
const { runValidation } = require('../utils/validators') 
const { userRegister, userLogin, activateAccount, logout, refreshUserToken, resetPassword } = require('../controllers/auth')

router.post('/login', userSigninValidator, runValidation, userLogin)
router.post('/register', userSignupValidator, runValidation, userRegister)
router.post('/verifyAccount', activateAccount)
router.post('/logout', logout)
router.post('/refresh_token', refreshUserToken)
router.post('/resetpassword', resetPassword)

module.exports = router