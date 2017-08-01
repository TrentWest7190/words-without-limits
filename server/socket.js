import SocketIO from 'socket.io'
import Store from './store'

let store = new Store()

const createSocket = (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    socket.join('lobby')

    socket.on('startRoom', () => {
      const newRoomCode = store.createRoom()
      io.to('lobby').emit('roomStarted', store.rooms)
    })
  })
}

export default createSocket
