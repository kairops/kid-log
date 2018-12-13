var amqp = require('amqplib/callback_api')
var debug = require('debug')('app:rabbit')

class Rabbit {
    constructor() {
        this.amqpConn = null
        this.pubChannel = null
        this.offlinePubQueue = []
        this.start = function () {
            amqp.connect(process.env.RABBIT_CONNECTION, function (err, conn) {
                if (err) {
                    rabbit.amqpConn = null
                    debug("rabbit err", err.message)
                }
                if (conn) {
                    conn.on("error", function (err) {
                        rabbit.amqpConn = null
                        if (err.message !== "Connection closing") {
                            debug("conn error", err.message)
                            return setTimeout(rabbit.start, 1000)
                        }
                    })
                    conn.on("close", function () {
                        debug("reconnecting")
                        rabbit.amqpConn = null
                        return setTimeout(rabbit.start, 1000)
                    })
                    debug("connected")
                    rabbit.amqpConn = conn
                    rabbit.whenConnected()
                }
            })
        }
        this.whenConnected = function () {
            rabbit.startWorker()
            rabbit.startPublisher()
        }
        this.startPublisher = function () {
            if (rabbit.amqpConn != null) {
                rabbit.amqpConn.createConfirmChannel(function (err, ch) {
                    if (rabbit.closeOnErr(err)) return
                    ch.on("error", function (err) {
                        debug("channel error", err.message)
                    })
                    ch.on("close", function () {
                        debug("channel closed")
                    })
                    rabbit.pubChannel = ch
                    while (true) {
                        debug("check if offLine Pub Queue have items")
                        var content = rabbit.offlinePubQueue.shift()
                        if (!content) break
                        rabbit.publish(content)
                    }
                })
            } else {
                debug("Rebbit not connected...")
            }
        }
        // method to publish a message, will queue messages internally if the connection is down and resend later
        this.publish = function (content) {
            try {
                if (rabbit.pubChannel != null) {
                    rabbit.pubChannel.assertQueue(process.env.RABBIT_QUEUE_NAME, { durable: true })
                    rabbit.pubChannel.sendToQueue(process.env.RABBIT_QUEUE_NAME, content, {}, function (err, ok) {
                        if (err) {
                            debug("Message offLine published: ", err)
                            rabbit.offlinePubQueue.push(content)
                            rabbit.pubChannel.connection.close()
                            return rabbit.start
                        } else {
                            debug("Message published", process.env.RABBIT_QUEUE_NAME)
                        }
                    })
                } else {
                    debug("Rabbit not connected...")
                    rabbit.offlinePubQueue.push(content)
                    return rabbit.start
                }
            } catch (e) {
                debug("Exception: Message offLine published: ", e.message)
                rabbit.offlinePubQueue.push(content)
                return rabbit.start
            }
        }
        this.startWorker = function () {
            if (rabbit.amqpConn != null) {
                rabbit.amqpConn.createChannel(function (err, ch) {
                    ch.prefetch(1)
                    ch.assertQueue(process.env.RABBIT_QUEUE_NAME, { durable: true })
                    ch.consume(process.env.RABBIT_QUEUE_NAME, processMsg, { noAck: false })
                    debug("Worker is started", process.env.RABBIT_QUEUE_NAME)
                    function processMsg(msg) {
                        var obj = JSON.parse(msg.content.toString())
                        debug("Message received %s", process.env.RABBIT_QUEUE_NAME, obj)                    
                        
                        ch.ack(msg)
                    }
                })
            } else {
                debug("Rabbit not connected...")
            }
        }
        this.closeOnErr = function (err) {
            if (!err) return false
            debug("error", err)
            rabbit.amqpConn.close()
            return true
        }
    }
}

var rabbit = new Rabbit()
rabbit.start()

module.exports = rabbit