const randomstring = require('randomstring')

module.exports = {
  lobbies: [],

  players: [],
  
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

  addPlayerToLobby (playerName, userID, lobbyCode) {
    this.players.push({
      playerName,
      userID,
      lobbyCode
    })
  }
}