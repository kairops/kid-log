var memRedis = require("redis")
var debug = require('debug')('app:redis')
var bluebird = require('bluebird')
bluebird.promisifyAll(memRedis)

class Redis {
    constructor() {
        this.start = function () {
            var client = memRedis.createClient({ "host": process.env.REDIS_CONNECTION })
            client.on("error", function (err) {
                debug(err.message)
                return setTimeout(redis.start, 10000)
            })
            this.redisClient = client
            debug("connected")
        }
    }
}

var redis = new Redis()
redis.start()

module.exports = redis.redisClient