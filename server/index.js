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
    store.transferKingship(lobbyCode, socket.id)
    
    callback(lobbyCode)
  })

  socket.on('getLobbyInfo', (lobbyCode, callback) => {
    const lobby = store.getLobbyByCode(lobbyCode)
    const players = store.getPlayersByCode(lobbyCode)

    callback({ lobby, players })
  })

  socket.on('disconnecting', () => {
    if (store.getPlayerBySocket(socket.id)) {
      const userID = store.userToSocketMap[socket.id]

      store.setPlayerAsDisconnected(userID)

      const lobbyCode = store.getPlayerByID(userID).lobbyCode
      const players = store.getPlayersByCode(lobbyCode)

      socket.in(lobbyCode).emit('updatePlayers', players)
    }
  })

  socket.on('reconnectToLobby', ({ lobbyCode, userID }, callback) => {
    const lobby = store.getLobbyByCode(lobbyCode)
    if (!lobby) {
      return callback(true)
    }
    store.updateUserToSocketMap(userID, socket.id)
    store.setPlayerAsConnected(userID)

    return callback(false)
  })
})