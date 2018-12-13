let express = require('express')
let router = express.Router()
let debug = require('debug')('app:routers:log')
let uuidv1 = require('uuid/v1')
let rabbit = require('../services/rabbit')
let redis = require('../services/redis')

router.post('/', function(req, res) {
    const jobId = uuidv1()
    redis.hmsetAsync(jobId, ["STATE", "PUBLISH"], function(err, res) {
        if (err) debug(err)
        redis.end(true)
    })
    rabbit.publish(new Buffer.from(JSON.stringify({ action: "save", jobId: jobId, data: req.body })))
    res.json({ status: true , data : { jobId : jobId }})
})

module.exports = router