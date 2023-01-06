const router = require('express').Router()

router.use('/restaurants', require('./restaurants'))
router.use('/plats', require('./plats'))
router.use('/users', require('./users'))
router.use('/auth', require('./auth'))
router.use('/upload', require('./upload'))

module.exports = router
