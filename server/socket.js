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
      io.to('lobby').emit('roomStarted', store.rooms)
      callback(newRoomCode)
    })

    socket.on('closeRoom', (roomCode) => {
      console.log(roomCode)
    })
  })
}

export default createSocket
