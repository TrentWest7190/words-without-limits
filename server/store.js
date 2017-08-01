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
    let roomcode = ''
    do {
      roomcode = randomstring.generate({
        length: 4,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      })
    } while (this.rooms.includes(roomcode))
    this.rooms.push(roomcode)
    return roomcode
  }

  closeRoom (roomCode) {
    this.rooms.splice(this.rooms.indexOf(roomCode), 1)
  }
}
