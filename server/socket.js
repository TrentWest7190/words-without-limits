import SocketIO from 'socket.io'
import Store from './store'

let store = new Store()

const createSocket = (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    socket.join('lobby')

    socket.on('startRoom', (callback) => {
      const newRoomCode = store.createRoom()
      socket.leave('lobby').join(newRoomCode)
      io.to('lobby').emit('updateRooms', store.rooms)
      callback(newRoomCode)
    })

    socket.on('closeRoom', (roomCode, callback) => {
      store.closeRoom(roomCode)
      socket.leave(roomCode).join('lobby')
      io.to('lobby').emit('updateRooms', store.rooms)
      callback()
    })
  })
}

export default createSocket
