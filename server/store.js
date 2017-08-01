import randomstring from 'randomstring'

let instance = null

export default class store {
  constructor () {
    if (!instance) {
      instance = this
    }

    this.rooms = []

    return instance
  }

  createRoom () {
    let roomCode = ''
    do {
      roomCode = randomstring.generate({
        length: 4,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      })
    } while (this.rooms.includes(roomCode))
    let newRoom = {
      roomCode,
      players: []
    }
    this.rooms.push(newRoom)
    return roomCode
  }

  closeRoom (roomCode) {
    this.rooms = this.rooms.filter((room) => {
      return room.roomCode !== roomCode
    })
  }

  addPlayerToRoom (playerName, socketid, roomCode, king) {
    let _room = this.getRoomByCode(roomCode)

    _room.players.push({
      playerName,
      socketid,
      king
    })
  }

  removePlayerFromRoom (socketid, roomCode) {
    let _room = this.getRoomByCode(roomCode)

    _room.players = _room.players.filter((player) => player.socketid !== socketid)
  }

  getRoomByCode (roomCode) {
    return this.rooms.find((room) => room.roomCode === roomCode)
  }
}
