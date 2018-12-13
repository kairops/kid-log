let debug = require('debug')('app:start')
let app = require('./app')

let server = app.listen(process.env.PORT, () => {
  debug(`Express is running on port ${process.env.PORT}`);
})