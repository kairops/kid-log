let mongoose = require('mongoose')
let Schema = mongoose.Schema

let LogSchema = Schema(
    {
        device   : { type: String, required: true },        
        code     : { type: String, required: true },
        message  : { type: String, required: true },
        createdAt: { type: Date }        
    },
    {
        versionKey: false
    }
)

let logModel  = mongoose.model('log', LogSchema)

module.exports = logModel
