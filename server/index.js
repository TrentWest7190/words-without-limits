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

    socket.join(lobbyCode)
    
    callback(lobbyCode)
  })

  socket.on('getLobbyInfo', (lobbyCode, callback) => {
    const lobby = store.getLobbyByCode(lobbyCode)
    const players = store.getPlayersByCode(lobbyCode)

    callback({ lobby, players })
  })

  socket.on('disconnecting', () => {
    const userID = store.getUserIDBySocket(socket.id)
    if (userID) {
      store.setPlayerAsDisconnected(userID)

      const lobbyCode = store.getPlayerByID(userID).lobbyCode
      const players = store.getPlayersByCode(lobbyCode)

      socket.to(lobbyCode).emit('updatePlayers', players)
    }
  })

  socket.on('reconnectToLobby', ({ lobbyCode, userID }, callback) => {
    const lobby = store.getLobbyByCode(lobbyCode)
    if (!lobby) {
      return callback(true)
    }
    store.updateUserToSocketMap(userID, socket.id)
    store.setPlayerAsConnected(userID)

    socket.join(lobbyCode)
    socket.to(lobbyCode).emit('updatePlayers', store.getPlayersByCode(lobbyCode))

    return callback(false)
  })

  socket.on('joinLobby', ({ lobbyCode, playerName, password }, callback) => {
    const lobby = store.getLobbyByCode(lobbyCode)
    if (!lobby) {
      return callback('LOBBY_NONEXISTENT')
    }

    if (lobby.password && !store.checkLobbyPassword(lobbyCode, password)) {
      return callback('INCORRECT_PASSWORD')
    }

    store.addPlayerToLobby(playerName, socket.id, lobbyCode)

    socket.join(lobbyCode)

    socket.to(lobbyCode).emit('updatePlayers', store.getPlayersByCode(lobbyCode))

    return callback()
  })

  socket.on('kickPlayer', (userID) => {
    io.to(store.getSocketByUserID(userID)).emit('kicked')
  })

  socket.on('leaveLobby', (lobbyCode, callback) => {
    const userID = store.getUserIDBySocket(socket.id)

    store.removePlayerFromLobby(userID)

    socket.leave(lobbyCode)
    socket.to(lobbyCode).emit('updatePlayers', store.getPlayersByCode(lobbyCode))

    return callback()
  })
})