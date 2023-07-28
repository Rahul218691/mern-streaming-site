const router = require('express').Router()
const { uploadPoster } = require('../helpers/upload.helper')
const { createNewStream } = require('../controllers/stream')
const { protect, admin } = require('../middlewares/auth')

router.post('/createStream', protect, uploadPoster.single('streamPoster'), createNewStream)

module.exports = router