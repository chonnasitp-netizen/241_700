const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyparser.json())
app.use(cors())

app.use('/appointments', require('./routes/appointments'))
app.use('/customers', require('./routes/customers'))
app.use('/service', require('./routes/service'))
app.use('/staff', require('./routes/staff'))
app.use('/time_slots', require('./routes/time_slots'))

module.exports = app