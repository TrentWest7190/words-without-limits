import SocketIO from 'socket.io'
import Store from './store'

let store = new Store()

const createSocket = (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    socket.join('lobby')

    socket.on('startRoom', (playerName, callback) => {
      // Create new room
      const newRoomCode = store.createRoom()

      // Add player who initialized room to room
      store.addPlayerToRoom(playerName, socket.id, newRoomCode, true)

      // Remove player from lobby, add them to new room created
      socket.leave('lobby').join(newRoomCode)

      // Update everybody in the lobby with the new state of the rooms
      io.to('lobby').emit('updateRooms', store.rooms)

      // Send back newly created room to client
      callback(store.getRoomByCode(newRoomCode))
    })

    socket.on('joinRoom', (roomCode, playerName, callback) => {
      // Add player to specified room
      store.addPlayerToRoom(playerName, socket.id, roomCode, false)

      // Move client from lobby to room
      socket.leave('lobby').join(roomCode)

      // Update everybody in the lobby with the new state of the rooms
      io.to('lobby').emit('updateRooms', store.rooms)

      // Update everybody already in the room with the new state of the players
      io.to(roomCode).emit('updatePlayers', store.getRoomByCode(roomCode).players)

      // Send back room information to client
      callback(store.getRoomByCode(roomCode))
    })

    socket.on('closeRoom', (roomCode, callback) => {
      store.closeRoom(roomCode)
      socket.leave(roomCode).join('lobby')
      io.to('lobby').emit('updateRooms', store.rooms)
      io.to(roomCode).emit('roomClosed')
      callback()
    })

    socket.on('leaveRoom', (roomCode, callback) => {
      // Remove player from room using socket id
      store.removePlayerFromRoom(socket.id, roomCode)

      // Move client back to lobby
      socket.leave(roomCode).join('lobby')

      // Update lobby with new room info
      io.to('lobby').emit('updateRooms', store.rooms)

      // Update players still in room with new player info
      io.to(roomCode).emit('updatePlayers', store.getRoomByCode(roomCode).players)

      // cb
      callback()
    })
  })
}

export default createSocket
