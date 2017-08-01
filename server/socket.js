import SocketIO from 'socket.io'
import Store from './store'

let store = new Store()

const createSocket = (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    socket.join('lobby')

    socket.on('startRoom', (playerName, callback) => {
      const newRoomCode = store.createRoom()
      store.addPlayerToRoom(playerName, socket.id, newRoomCode, true)
      socket.leave('lobby').join(newRoomCode)
      io.to('lobby').emit('updateRooms', store.rooms)
      callback(newRoomCode)
    })

    socket.on('joinRoom', (roomCode, playerName, callback) => {
      store.addPlayerToRoom(playerName, socket.id, roomCode, false)
      socket.leave('lobby').join(roomCode)
      io.to('lobby').emit('updateRooms', store.rooms)
      callback()
    })

    socket.on('closeRoom', (roomCode, callback) => {
      store.closeRoom(roomCode)
      socket.leave(roomCode).join('lobby')
      io.to('lobby').emit('updateRooms', store.rooms)
      io.to(roomCode).emit('roomClosed')
      callback()
    })

    socket.on('leaveRoom', (roomCode, callback) => {
      socket.leave(roomCode).join('lobby')
      callback()
    })
  })
}

export default createSocket
