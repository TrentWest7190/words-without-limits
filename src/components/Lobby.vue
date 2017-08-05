<template>
  <div class="container">
    <header>
      <h1>Waiting For Players</h1>
    </header>
    <div class="pure-g">
      <ul class="pure-u-1-2">
        <li v-for="player in players" :key="player.userID">
          <span :class="player.king ? 'king' : ''">
            {{ `${player.playerName}${player.king ? "(King)" : ""}`}}
          </span>
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
      code: this.$route.params.lobbyCode,
      players: []
    }
  },

  created () {
    this.fetchLobbyInfo()

    this.$socket.on('updatePlayers', (players) => {
      this.players = players
    })
  },

  methods: {
    fetchLobbyInfo () {
      this.$socket.emit('getLobbyInfo', this.$route.params.lobbyCode, ({ lobby, players }) => {
        this.players = players
      })
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!Cookies.get('lobbyCode') || !Cookies.get('userID')) {
      next('/')
    } else {
      next()
    }
  },

  beforeRouteLeave (to, from, next) {
    if (confirm('Are you sure you want to leave?')) {
      Cookies.remove('lobbyCode')
      Cookies.remove('userID')
      next()
    } else {
      next(false)
    }
  }
}
</script>


<style lang="scss" scoped>
.pure-g {
  justify-content: center;
}

.pure-u-1-2 {
  li {
    text-align: center;
    list-style: none;
    font-size: 25px;
  }

  .king {
    color: gold;
  }
}
</style>
