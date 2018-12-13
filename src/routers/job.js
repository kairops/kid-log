let express = require('express')
let router = express.Router()
let debug = require('debug')('app:routers:job')
let redis = require('../services/redis')

router.get('/:id', function (req, res) {    
    redis.hmgetAsync(req.params.id, [ "STATE", "MESSAGE"]).then(function(row, err) {
        if (err) {
            res.json({ status: false})
        } else if (row) {
            debug("Get job state:", req.params.id, row[0], row[1])            
            res.json({ status: (row[0] != "ERROR"), data : { state : row[0], message: row[1] }})
        } else {
            res.json({ status: false})
        }
    })
})

module.exports = router