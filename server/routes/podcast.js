const router = require('express').Router()
const { getTrendingPodcasts } = require('../controllers/podcast')

router.get('/getTrendingPodcasts', getTrendingPodcasts)

module.exports = router