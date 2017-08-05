const randomstring = require('randomstring')

module.exports = {
  lobbies: [],

  players: [],

  userToSocketMap: {},
  
  openLobby (password) {
    let lobbyCode = ''

    do {
      lobbyCode = randomstring.generate({
        length: 4,
        charset: 'alphabetic',
        capitalization: 'uppercase'
      })
    } while (this.getLobbyByCode(lobbyCode))

    let lobby = {
      lobbyCode
    }

    if (password) {
      lobby.password = password
    }

    this.lobbies.push(lobby)

    console.log(`Created new lobby with code ${lobbyCode}`)

    return lobbyCode
  },

  getLobbyByCode (lobbyCode) {
    return this.lobbies.find((lobby) => lobby.lobbyCode === lobbyCode)
  },

  getLobbyByPlayerID (userID) {
    const player = this.getPlayerByID(userID)
    return this.getLobbyByCode(player.lobbyCode)
  },

  getPlayersByCode (lobbyCode) {
    return this.players.filter((player) => player.lobbyCode === lobbyCode)
  },

  getPlayerByID (userID) {
    return this.players.find((player) => player.userID === userID)
  },

  getPlayerBySocket (socketID) {
    return this.userToSocketMap[socketID]
  },

  addPlayerToLobby (playerName, userID, lobbyCode) {
    this.players.push({
      playerName,
      userID,
      lobbyCode,
      king: false,
      disconnected: false
    })

    this.updateUserToSocketMap(userID, userID)
  },

  updateUserToSocketMap (userID, socketID) {
    this.userToSocketMap[userID] = socketID
  },

  transferKingship (lobbyCode, userID) {
    let players = this.getPlayersByCode(lobbyCode)
    players.forEach((player) => player.king = false)
    this.getPlayerByID(userID).king = true
  },

  setPlayerAsDisconnected (userID) {
    let player = this.getPlayerByID(userID)
    player.disconnected = true
  },

  setPlayerAsConnected (userID) {
    let player = this.getPlayerByID(userID)
    player.disconnected = false
  }
}