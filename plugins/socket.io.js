import io from 'socket.io-client'

const socket = io(process.env.HOST || 'http://localhost:3000')

export default socket
