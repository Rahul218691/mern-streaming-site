const router = require('express').Router()
const { uploadPoster } = require('../middlewares/upload')
const { createNewStream } = require('../controllers/stream')
const { protect, admin } = require('../middlewares/auth')

router.post('/createStream', protect, uploadPoster.single('streamPoster'), createNewStream)

module.exports = router