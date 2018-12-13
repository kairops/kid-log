let express = require('express')
let router = express.Router()
let debug = require('debug')('app:routers:status')
let rabbit = require('../services/rabbit')
let redis = require('../services/redis')
let mongo = require('../services/mongodb')

router.get('/', function(req, res) {
    let status = true
    let data = {
        redis : redis.connected,
        mongodb : (mongo.mongoConn?true:false),
        rabbit : (rabbit.amqpConn?true:false)
    }
    debug({ status: status, data : data})
    res.json({ status: status, data : data})
})

module.exports = router