require('dotenv').config()

let express = require('express')
let bodyParser = require('body-parser')
let helmet = require('helmet')

let mongodb = require('./services/mongodb')
let redis = require('./services/redis')
let rabbit = require('./services/rabbit')
let statusRouter = require('./routers/status')
let jobRouter = require('./routers/job')
let logRouter = require('./routers/log')


let app = express()

// Middlewares
app.use([
  helmet(),
  bodyParser.urlencoded({ extended: false })
])

app.use(bodyParser.json())

// Add routers
app.use('/status', statusRouter)
app.use('/job', jobRouter)
app.use('/log', logRouter)

module.exports = app