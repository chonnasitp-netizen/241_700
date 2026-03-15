const express = require('express')
const router = express.Router()
const controller = require('../controllers/tags')

router.get('/', controller.getAll)

router.get('/:id', controller.getById)

router.post('/', controller.create)

router.put('/:id', controller.update)

router.delete('/:id', controller.remove)

//put แก้ทับทั้งก้อน/ patch แก้บางส่วน รู้แค่นี้
//อันนี้เอาไว้แก้ไขตรง status โดยเฉพาะนะจ๊ะ 
router.put('/:id/status', controller.update_status)
module.exports = router