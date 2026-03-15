const express = require('express')
const app = express()
app.use(bodyparser.json())
app.use(cors())

app.use('/appointments', require('./routes/appointments'))
app.use('/customers', require('./routes/customers'))
app.use('/service', require('./routes/service'))
app.use('/staff', require('./routes/staff'))
app.use('/time_slots',require('./routes/time_slots'))

app.get('/api-docs/spec', (req, res) => res.json(swaggerSpec))
app.get('/api-docs', (req, res) => res.sendFile(path.join(__dirname, 'swagger-ui.html')))

app.use(errorHandler)

module.exports = app
