const express = require('express')
const router = express.Router()
const tambola = require('../controllers/ticket.controller')
router.post('/generateTicket', tambola.generateTicket)
router.get('/ticket', tambola.ticket)

module.exports = router
