import io from 'socket.io-client'

export default {
  install (Vue, { HOST, PORT }) {
    const uri = `${HOST}:${PORT}`
    let socket = io(uri)

    socket.on('connect', () => {
      console.log(`Socket connected to ${uri}`)
    })
    Vue.prototype.$socket = socket
  }
}
