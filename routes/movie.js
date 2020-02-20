const express = require('express')
const router = express.Router()
const controller = require('../controllers/movie')

router.get('/', controller.getAll)

module.exports = router