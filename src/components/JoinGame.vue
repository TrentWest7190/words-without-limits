<template>
  <div class="container">
    <header>
      <h1>Join Existing Game</h1>
    </header>
    <div class="pure-g">
      <div class="pure-u-1">
        <span>Lobby Code</span>
        <input 
          :value="lobbyCode"
          @input="lobbyCode = $event.target.value.toUpperCase()"
          placeholder="Enter 4-Letter lobby code"
          maxlength="4"
        >
      </div>
      <div class="pure-u-1">
        <span>Name</span>
        <input 
          v-model="playerName" 
          placeholder="Give yourself a name"
          maxlength="15"
        >
      </div>
      <div class="pure-u-1">
        <span>Password (leave blank if none exists)</span>
        <input 
          v-model="password" 
          placeholder="Enter a password"
          maxlength="15"
        >
      </div>
      <button 
        class="pure-u-1-3"
        :disabled="playerName.length <= 0 || playerName.length <= 0"
        @click="joinLobby(lobbyCode, playerName, password)">
          Join The Lobby!
      </button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      lobbyCode: '',
      playerName: '',
      password: ''
    }
  },

  methods: {
    joinLobby (lobbyCode, playerName, password) {
      this.$socket.emit('joinLobby', { lobbyCode, playerName, password }, (error) => {
        if (error === 'LOBBY_NONEXISTENT') {
          alert('Cannot find a lobby with that code!')
        } else if (error === 'INCORRECT_PASSWORD') {
          alert('Incorrect password!')
        } else {
          Cookies.set('userID', this.$socket.id)
          Cookies.set('lobbyCode', lobbyCode)
          this.$router.push(`/game/${lobbyCode}`)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.pure-g {
  justify-content: center;
}

.pure-u-1 {
  align-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 0px 20%;

  input {
    font-size: 40px;
  }

  span {
    text-align: left;
    font-size: 25px;
    margin: 4px 0px;
    letter-spacing: 0.1em;
  }
}

.pure-u-1-3 {
  text-align: center;
  font-size: 50px;
  margin-top: 10px;
}

button[disabled] {
  opacity: .2;
}
</style>
