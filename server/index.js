const express = require('express')
const http = require('http')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
