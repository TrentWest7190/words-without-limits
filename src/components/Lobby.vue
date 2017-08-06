<template>
  <div class="container">
    <header>
      <h1>Waiting For Players</h1>
    </header>
    <div class="pure-g">
      <ul class="pure-u-1-2">
        <li class="pure-g" v-for="player in players" :key="player.userID">
          <span :class="'pure-u-1-2 ' + getTextClass(player)">
            {{ `${player.playerName}${player.king ? "(King)" : ""}${player.disconnected ? "(Disconnected)" : ""}`}}
          </span>
          <button v-if="king && !player.king" class="pure-u-1-2" @click="kickPlayer(player)">Kick</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      lobbyCode: this.$route.params.lobbyCode,
      players: [],
      king: false
    }
  },

  created () {
    this.fetchLobbyInfo()

    this.$socket.on('updatePlayers', (players) => {
      console.log(this)
      this.players = players
    })

    this.$socket.on('kicked', () => {
      alert('You were kicked from the room!')
      this.leaveLobby()
    })
  },

  beforeDestroy () {
    this.$socket.removeListener('updatePlayers')
    this.$socket.removeListener('kicked')
  },

  methods: {
    fetchLobbyInfo () {
      this.$socket.emit('getLobbyInfo', this.$route.params.lobbyCode, ({ lobby, players }) => {
        this.players = players
        this.king = players.find((player) => player.king).userID === Cookies.get('userID')
      })
    },

    getTextClass (player) {
      if (player.king) {
        return 'king'
      } else if (player.disconnected) {
        return 'disconnected'
      }
    },

    kickPlayer (player) {
      this.$socket.emit('kickPlayer', player.userID)
    },

    leaveLobby () {
      Cookies.remove('lobbyCode')
      Cookies.remove('userID')
      this.$socket.emit('leaveLobby', this.lobbyCode, () => {
        this.$router.replace('/')
      })
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!Cookies.get('lobbyCode') || !Cookies.get('userID')) {
      next('/')
    } else {
      next()
    }
  }
}
</script>


<style lang="scss" scoped>
.pure-u-1-2 {
  li {
    text-align: center;
    list-style: none;
    font-size: 25px;
  }

  .king {
    color: gold;
  }

  .disconnected {
    color: gray;
    text-decoration: line-through;
  }
}
</style>
