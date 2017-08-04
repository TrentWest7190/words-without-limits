const express = require('express')
const http = require('http')

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port, host)
const io = require('socket.io')(server)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

const store = require('./store')

io.on('connection', (socket) => {
  console.log('Socket connected')

  socket.on('openLobby', ({ playerName, password }, callback) => {
    const lobbyCode = store.openLobby()

    store.addPlayerToLobby(playerName, socket.id, lobbyCode)
    
    callback(lobbyCode)
  })
})