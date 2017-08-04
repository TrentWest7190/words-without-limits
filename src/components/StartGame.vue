<template>
  <div class="container">
    <header>
      <h1>Start A New Game</h1>
    </header>
    <div class="pure-g">
      <div class="pure-u-1">
        <span>Name</span>
        <input 
          v-model="playerName" 
          placeholder="Give yourself a name"
          maxlength="15"
        >
      </div>
      <div class="pure-u-1">
        <span>Password (if you want)</span>
        <input 
          v-model="password" 
          placeholder="Enter a password"
          maxlength="15"
        >
      </div>
      <button 
        class="pure-u-1-3"
        :disabled="playerName.length <= 0"
        @click="openLobby(playerName, password)">
          Open The Lobby!
      </button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'StartGame',

  data () {
    return {
      playerName: '',
      password: ''
    }
  },

  methods: {
    openLobby (playerName, password) {
      this.$socket.emit('openLobby', { playerName, password }, (lobbyCode) => {
        this.$router.push(`/game/${lobbyCode}`, () => {
          Cookies.set('playerID', this.$socket.id)
          Cookies.set('lobbyID', lobbyCode)
        })
      })
    }
  }
}
</script>


<style lang="scss" scoped>
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