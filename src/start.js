require('dotenv').config();
let debug = require('debug')('app:start')
let express = require('express');
let app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(process.env.SERVER_PORT, () => {
  debug(`Express is running on port ${process.env.SERVER_PORT}`);
});