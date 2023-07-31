const router = require('express').Router()
const { getPodcasts, getPodcastPlaylist } = require('../controllers/podcast')

router.get('/getPodcasts', getPodcasts)
router.get('/getPodcastPlaylist', getPodcastPlaylist)

module.exports = router