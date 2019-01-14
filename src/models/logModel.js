let mongoose = require('mongoose')
let Schema = mongoose.Schema

let LogSchema = Schema(
    {
        device   : { type: String, required: true },    // Device ID     
        level    : { type: String, required: true },    // SEVERE, WARNING, INFO, CONFIG, FINE, FINER, FINEST
        message  : { type: String, required: true },    // Text
        code     : { type: String },                    // Bitacora Code
        createdAt: { type: Date, default: Date.now() }  // Created Date
    },
    {
        versionKey: false
    }
)

let logModel  = mongoose.model('log', LogSchema)

module.exports = logModel
