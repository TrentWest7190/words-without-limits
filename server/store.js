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
    this.rooms.push({
      roomCode,
      players: []
    })
    return roomCode
  }

  closeRoom (roomCode) {
    this.rooms = this.rooms.filter((room) => {
      return room.roomCode !== roomCode
    })
  }

  addPlayerToRoom (playerName, socketid, roomCode, king) {
    this.rooms.find((room) => {
      return room.roomCode === roomCode
    }).players.push({
      playerName,
      socketid,
      king
    })
  }
}
