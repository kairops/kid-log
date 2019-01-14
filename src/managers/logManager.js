var debug = require('debug')('app:logManager')
var LogModel = require('../models/logModel')

class LogManager {
    constructor() {
        this.save = function(data, next) {
            debug("Save: ", data)
            var log = new LogModel(data)
            log.save(function(err) {
                if (err) debug(err)
                next((err ? "ERROR": "OK"), (err ? err.message : "Data saved"))
            })            
        }
    }
}

let logManager = new LogManager()
debug("LogManager loaded...")
module.exports = logManager