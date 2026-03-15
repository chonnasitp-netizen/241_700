const express = require('express')
const router = express.Router()
const controller = require('../controllers/tags')

router.get('/', controller.getAll) //only admin นะไอสัส

router.get('/:id', controller.getById)

router.post('/', controller.create)

router.put('/:id', controller.update)

router.delete('/:id', controller.remove)

module.exports = router